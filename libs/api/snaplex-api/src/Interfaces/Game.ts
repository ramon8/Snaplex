import { Instance } from "./Instance";
import { Player } from "./Player";
import { Location } from './Location';

export interface Game extends Instance {
    players: Player[];
    locations: Location[];
    maxTurns: number;
    turn: number;
}