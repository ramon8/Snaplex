import { Instance } from "./Instance";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";

export interface User extends Instance {
    socket: Socket<DefaultEventsMap>
    isWaiting: boolean;
}