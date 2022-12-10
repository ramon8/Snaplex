import { Action, EmitReconnectGamePayload, Location } from "@types";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { startNewTimer } from "../service/timeOutService";
import { store } from "../store";
import { findRoom } from "../utils";
import { setTimer } from "../features/gameRooms/gameRooms";
import { setNewState } from "./onFinishTurn";

export const emitNextTurn = (gameRoom: GameRoom) => {
  const { gameRooms } = store.getState();
  const gameRoomIndex = findRoom(gameRooms, gameRoom.id);

  let { locations, maxTurns, turn } = gameRooms[gameRoomIndex].game

  const prevLocations: Location[] = []

  locations.forEach((location, i) => {
    prevLocations.push({
      ...location,
      playersCards: [location.playersCards[1], location.playersCards[0]]
    })
  })

  gameRooms[gameRoomIndex].users.forEach(({ deck, hand, id, mana, socket }, userindex) => {
    let data: EmitReconnectGamePayload = {
      deck,
      hand,
      locations: locations,
      mana,
      turn,
      maxTurns,
      userId: id,
    }
    if (userindex) {
      data = {
        deck,
        hand,
        locations: prevLocations,
        mana,
        turn,
        maxTurns,
        userId: id,
      }
    }
    socket.emit("NEXT_TURN", data);
  })
  startNewTimer(gameRooms[gameRoomIndex], 30000);
}