import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Action } from "./Action";
import { Card } from "./Card";
import { Player } from "./Player";

export interface User extends Player {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  turnActions?: Action[];
}
