import { Game } from "@types";
import { GameRoom } from "./gameRoom.interfaces";

export const initialGame: Game = {
  id: '',
  name: '',
  locations: [],
  maxTurns: 0,
  turn: 0
}

export const initialGameRoom: GameRoom = {
  id: '',
  game: initialGame,
  users: []
}
