import { Action } from "@types";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import gameRooms, { setTimer } from "../features/gameRooms/gameRooms";
import { store } from "../store";
import { setNewState } from "./onFinishTurn";
import { startNewTimer } from "../service/timeOutService";


export const emitStartGame = (gameRoom: GameRoom) => {
  gameRoom.users.forEach(({ id, deck, hand, mana, socket }, i) => {
    const { game: { locations, turn, maxTurns } } = gameRoom;
    const data = {
      deck,
      hand,
      locations,
      mana,
      turn,
      maxTurns,
      userId: id,
    };
    socket.emit("START_GAME", data)
  })
}