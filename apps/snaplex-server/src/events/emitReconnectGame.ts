// import { EmitReconnectGamePayload } from "@types";
// import { Socket } from "socket.io";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
// import { findUser } from "../utils";


// export const emitReconnect = (gameRooms: GameRoom[], gameRoom: GameRoom, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
//   const userId = socket.handshake.query['id'] as string;
//   const { deck, hand, id, mana } = gameRoom.users[findUser(gameRoom, userId)]
//   const { locations, maxTurns, turn } = gameRoom.game

//   const data: EmitReconnectGamePayload = {
//     deck,
//     hand,
//     locations,
//     mana,
//     turn,
//     maxTurns,
//     userId: id,
//   }
//   socket.emit("RECONNECT", data);
// }

import { EmitReconnectGamePayload } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { store } from "../store";
import { findRoom, findUser } from "../utils";


export const emitReconnect = (gameRooms: GameRoom[], gameRoom: GameRoom, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const userId = socket.handshake.query['id'] as string;
  const gameRoomIndex = findRoom(gameRooms, gameRoom.id);

  const { deck, hand, id, mana } = gameRooms[gameRoomIndex].users[findUser(gameRooms[gameRoomIndex], userId)]
  const { locations, maxTurns, turn } = gameRooms[gameRoomIndex].game

  const newLocations = [...locations];

  newLocations.forEach((_, i) => {
    [newLocations[i].playersCards[0], newLocations[i].playersCards[1]] = [locations[i].playersCards[1], locations[i].playersCards[0]]
  })

  const userindex = findUser(gameRooms[gameRoomIndex], userId);
  let data: EmitReconnectGamePayload = {
    deck,
    hand,
    locations,
    mana,
    turn,
    maxTurns,
    userId: id,
  }
  if (userindex) {
    data = {
      deck,
      hand,
      locations: newLocations,
      mana,
      turn,
      maxTurns,
      userId: id,
    }
  }


  console.log({ data });
  socket.emit("RECONNECT", data);
}