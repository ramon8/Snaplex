import { Action } from "@types";
import { Socket } from "socket.io";
import { setLocations, setPlayersCardsInLocation, setUserTurnActions } from "../features/gameRooms/gameRooms";
import { GameRoom } from "../interfaces/gameRoom";
import { store } from "../store";
import { findRoom } from "../utils";
import { emitNextTurn } from "./emitNextTurn";

export const onFinishTurn = (roomId: string, socket: any, userId: string) => (actions: Action[]) => {
  console.log({ actions })

  // const newPlayersCards

  // gameRoom.game.locations.forEach(locations => {
  //   store.dispatch(setPlayersCardsInLocation({ locationId: locations.id, playersCards: [], roomId }))
  // });

  const { gameRooms } = store.getState();
  const gameRoomIndex = findRoom(gameRooms, roomId)
  const gameRoom = gameRooms[gameRoomIndex]

  const userWithActions = gameRoom.users.find(({ turnActions }) => turnActions && turnActions?.length > 0)
  const usersActions: Action[][] = [[], []]

  store.dispatch(setUserTurnActions({ userId, roomId: gameRoom.id, turnActions: actions }));

  if (userWithActions) {

    const { gameRooms: newGamesRooms } = store.getState();
    const newGameRoomIndex = findRoom(newGamesRooms, roomId)
    const newGameRoom = newGamesRooms[newGameRoomIndex]

    newGameRoom.users.forEach((user, index) => {
      usersActions[index].push(...user.turnActions as Action[]);
      store.dispatch(setUserTurnActions({ userId, roomId: newGameRoom.id, turnActions: [] }));
    });

    emitNextTurn(newGameRoom, socket, usersActions); // Change this to process data with dispac
  }
}