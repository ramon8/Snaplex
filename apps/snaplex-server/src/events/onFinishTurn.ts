import { Action } from "@types";
import { setUserTurnActions } from "../features/gameRooms/gameRooms";
import { store } from "../store";
import { findRoom } from "../utils";
import { emitNextTurn } from "./emitNextTurn";

export const onFinishTurn = (roomId: string, socket: any, userId: string) => (actions: Action[]) => {
  const { gameRooms } = store.getState();
  const gameRoomIndex = findRoom(gameRooms, roomId)
  const gameRoom = gameRooms[gameRoomIndex]
  const userWithActions = gameRoom.users.find(({ turnActions }) => turnActions && turnActions?.length > 0)
  const usersActions: Record<string, Action[]> = {}

  store.dispatch(setUserTurnActions({ userId, roomId: gameRoom.id, turnActions: actions }));

  if (userWithActions) {
    gameRoom.users.forEach(user => {
      usersActions[user.id] = user.turnActions as Action[];
      if (!user.turnActions) usersActions[user.id] = actions;
      store.dispatch(setUserTurnActions({ userId, roomId: gameRoom.id, turnActions: [] }));
    });


    emitNextTurn(gameRoom, socket, usersActions);
  }
}
