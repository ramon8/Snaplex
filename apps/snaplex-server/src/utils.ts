import { GameRoom } from "./features/gameRooms/gameRoom.interfaces";

export const findRoom = (gameRooms: GameRoom[], roomId: string): number => {
  return gameRooms.findIndex(gameRoom => gameRoom.id === roomId)
}

export const findUser = (gameRoom: GameRoom, userId: string): number => {
  return gameRoom.users.findIndex(user => user.id === userId)
}
