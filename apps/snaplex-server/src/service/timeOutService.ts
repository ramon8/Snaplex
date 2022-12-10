import { Action } from "@types";
import { setNewState } from "../events/onFinishTurn";
import { setTimer } from "../features/gameRooms/gameRooms";
import { GameRoom } from "../interfaces/gameRoom";
import { store } from "../store";
import { findRoom } from "../utils";


export const startNewTimer = (gameRoom: GameRoom, time: number) => {
    const { gameRooms } = store.getState();
    const gameRoomIndex = findRoom(gameRooms, gameRoom.id)
    store.dispatch(setTimer({
        roomId: gameRooms[gameRoomIndex].id, timeOut: setTimeout(() => {
            const { gameRooms } = store.getState();
            const gameRoomIndex = findRoom(gameRooms, gameRoom.id)
            const actions: Action[][] = gameRooms[gameRoomIndex].users.map(user => user.turnActions || []);
            setNewState(gameRooms[gameRoomIndex], actions);
        }, 5000)
    }))
}