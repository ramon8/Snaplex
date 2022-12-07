import { Action, EmitNextTurnPayload } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { findUser } from "../utils";

export const emitNextTurn = (gameRoom: GameRoom, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, actions: Record<string, Action[]>) => {
  const userId = socket.handshake.query['id'] as string;
  const { deck, hand, id, mana } = gameRoom.users[findUser(gameRoom, userId)]
  const { locations, maxTurns, turn } = gameRoom.game

  console.log({ actions })

  const data: EmitNextTurnPayload = {
    deck,
    hand,
    locations,
    mana,
    turn,
    maxTurns,
    userId: id,
  }
  gameRoom.users.forEach((user) => {

    user.socket.emit("NEXT_TURN", data);
  })
}
