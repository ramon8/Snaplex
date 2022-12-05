import { Instance } from "./Instance";
import { Player } from "./Player";
import { Location } from './Location';

export interface Game extends Instance {
    playerA: Player;
    playerB: Player | null;
    locations: Location[];
    maxTurns: number;
    turn: number;
}