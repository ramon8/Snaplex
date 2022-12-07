import { EmitStartGamePayload } from "@types";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";

export const emitStartGame = (gameRoom: GameRoom) => {
  const data: EmitStartGamePayload[] = gameRoom.users.map(({ id, deck, hand, mana }, i) => {
    const { game: { locations, turn, maxTurns } } = gameRoom;
    return {
      deck,
      hand,
      locations,
      mana,
      turn,
      maxTurns,
      userId: id,
    }
  });

  gameRoom.users.forEach(({ socket }, i) => socket.emit("START_GAME", data[i]))
}
