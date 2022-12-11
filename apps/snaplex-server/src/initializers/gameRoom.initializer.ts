import { GameRoom } from "@types";
import { createGame } from "./game.initializer";
import { createPlayer } from "./player.initializers";

export const initialGameRoom: GameRoom = {
    game: createGame(),
    id: '',
    isWaiting: true,
    oponent: createPlayer(),
    player: createPlayer(),
    snapShots: [],
}

export const createGameRoom = (gameRoom?: Partial<GameRoom>): GameRoom => ({ ...initialGameRoom, ...gameRoom })