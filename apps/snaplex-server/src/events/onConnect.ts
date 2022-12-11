import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { store } from "../store";
import { joinGame, newGame, reconnectGame } from './../service/Connection.service';

export const onConnect = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const userId = socket.handshake.query['id'] as string;
    const { gameRooms } = store.getState();
    console.log(`[${userId}] connected`)

    const isUserInRoomAlready = gameRooms?.findIndex(({ player, oponent }) =>
        [player, oponent].map(({ id }) => id).includes(userId))

    if (isUserInRoomAlready === -1) { // User not found in any room, try to join waiting room
        console.log(`[${userId}] searching for game`)
        const isAnyRoomWaiting = gameRooms.findIndex(({ isWaiting }) => isWaiting)

        if (isAnyRoomWaiting === -1) newGame(socket) // No rooms are waiting, create new room
        else joinGame(socket, gameRooms[isAnyRoomWaiting].id) // Found waiting room, then join that room with the current user
    } else reconnectGame(socket, gameRooms[isUserInRoomAlready].id)
}
