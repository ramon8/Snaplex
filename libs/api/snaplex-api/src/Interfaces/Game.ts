import { Instance } from "./Instance";
import { Location } from './Location';
export interface Game extends Instance {
  locations: Location[];
  maxTurns: number;
  turn: number;
}
