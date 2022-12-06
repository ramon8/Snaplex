import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Card } from "./Card";
import { Instance } from "./Instance";

export interface User extends Instance {
    socket: Socket<DefaultEventsMap>
    playersCards: Card[][];
}