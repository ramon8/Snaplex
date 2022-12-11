import { Game } from "@types";

const initialGame: Game = {
    firstToReveal: '',
    maxTurns: 0,
    sites: [],
    turn: 0,
    turnStartedAt: 0,
};

export const createGame = (game?: Partial<Game>): Game => ({ ...initialGame, ...game })