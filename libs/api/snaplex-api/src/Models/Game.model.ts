import { Player } from "../Interfaces";
import { Site } from "./Site.model";

export interface Game {
    sites: Site[];

    turn: number;
    maxTurns: number;
    /** The time when the turn started */
    turnStartedAt: number;

    /** The duration of the tunr in seconds */
    maxTurnTime: number;

    /** The first player to reveal the cards this turn */
    firstToReveal: string;

    winner?: string;
}