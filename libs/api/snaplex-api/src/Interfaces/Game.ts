import { Instance } from "./Instance";
import { Player } from "./Player";

export interface Game extends Instance {
    playerA: Player;
    playerB: Player;
    locations: Location[];
    maxTurns: number;
    turn: number;
}