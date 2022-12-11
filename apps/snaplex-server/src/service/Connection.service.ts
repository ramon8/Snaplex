import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { onFinishTurn } from "../events/onFinishTurn";
import { addGameRoom, joinGameRoom } from "../features/gameRooms/gameRooms";
import { createGameRoom } from "../initializers/gameRoom.initializer";
import { createPlayer } from "../initializers/player.initializers";
import { store } from "../store";
import { findRoom } from "../utils";

/** Creates a new game, initializing the first user, and dispatching it to the store,
 *  it also adds to the soket the callback for the onFinishTurn event */
const newGame = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const id = socket.handshake.query['id'] as string;

    store.dispatch(addGameRoom(createGameRoom({ id: `room_${id}`, player: createPlayer({ id, socket }) })))
    socket.on("FINISH_TURN", onFinishTurn(`room_${id}`, socket, id))

    console.log(`[${id}] new game created, waiting other player to join...`)
}

const joinGame = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, roomId: string) => {
    const id = socket.handshake.query['id'] as string;
    const { gameRooms } = store.getState();
    const gameRoomIndex = findRoom(gameRooms, roomId);

    store.dispatch(joinGameRoom({ roomId: roomId, player: createPlayer({ id, socket }) }))
    socket.on("FINISH_TURN", onFinishTurn(gameRooms[gameRoomIndex].id, socket, id))
    // startNewTimer(gameRooms[isAnyRoomWaiting], 100000); // 1 min

    console.log(`[${id}] game found, connecting to game ${roomId}`)
}

const reconnecGame = () => { }

export { newGame, joinGame, reconnecGame };
