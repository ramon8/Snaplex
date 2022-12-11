import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Entity } from "./Entity.model";

export interface User extends Entity {
    userName: string;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}