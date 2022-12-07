import { EmitReconnectGamePayload } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { findUser } from "../utils";


export const emitReconnect = (gameRoom: GameRoom, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const userId = socket.handshake.query['id'] as string;
  const { deck, hand, id, mana } = gameRoom.users[findUser(gameRoom, userId)]
  const { locations, maxTurns, turn } = gameRoom.game

  const data: EmitReconnectGamePayload = {
    deck,
    hand,
    locations,
    mana,
    turn,
    maxTurns,
    userId: id,
  }
  socket.emit("RECONNECT", data);
}
