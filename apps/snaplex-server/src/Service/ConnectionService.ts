import { Game, GameRoom, START_GAME_PAYLOAD } from "@types";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { initializeGameRoom, joinGameRoom, processInitialData } from "./GameService";
import { onFinishTurn } from "./NetworkService";
import util from 'util';

export const onUserConnect = (gameRooms: GameRoom[], io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
    (socket: Socket<DefaultEventsMap>) => {
        const userId = getUserId(socket);

        // Is user already connected ?
        const userGameRoom = getGameRoom(gameRooms, userId);
        console.log({ userGameRoom });
        if (userGameRoom) {
            const { id: roomId, users } = userGameRoom

            console.log(`[${userId}]: reconnecting to room ${roomId}`);

            const user = users.find(user => user.id === userId)
            if (user) {
                // Update sokcet, join room, emit RECCONECT
                user.socket = socket
                socket.join(roomId)
                socket.emit("RECONNECT", "RECONNECT")
            }
        } else {
            // Is there any player waiting for other player to join ?
            const gameRoom = getRoomWaiting(gameRooms);
            if (gameRoom) {
                // Join player, join room, emmit START_GAME
                joinGameRoom(gameRoom, userId, socket)
                const data: START_GAME_PAYLOAD[] = processInitialData(gameRoom);
                gameRoom.users.forEach((user, i) => {
                    user.socket.emit("START_GAME", data[i])
                    user.socket.on("FINISH_TURN", onFinishTurn(gameRoom))
                })
                console.log(`[${userId}]: started the game in room ${gameRoom.id}`);
            } else {
                // Create new room and wait for other player to join
                const newGameRoom = initializeGameRoom(userId, socket)
                gameRooms.push(newGameRoom)
            }
        }
    }

export const getUserId = (socket: Socket<DefaultEventsMap>): string => {
    return socket.handshake.query['id'] as string
}

export const getGameRoom = (gameRooms: GameRoom[], id: string): GameRoom | undefined => {
    return gameRooms.find(gameRoom => gameRoom.users.map(user => user.id).includes(id));
}

export const getRoomWaiting = (gameRooms: GameRoom[]): GameRoom | undefined => {
    return gameRooms.find(gameRoom => gameRoom.users.length === 1);
}