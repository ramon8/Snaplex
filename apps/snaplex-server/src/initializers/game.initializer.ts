import { Game } from "@types";

const initialGame: Game = {
    firstToReveal: '',
    maxTurns: 0,
    sites: [],
    turn: 0,
    maxTurnTime: 60000, // 60 seconds
    turnStartedAt: 0,
};

export const createGame = (game?: Partial<Game>): Game => ({ ...initialGame, ...game })