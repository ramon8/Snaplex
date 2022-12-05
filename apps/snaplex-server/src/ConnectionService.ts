import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const onUserConnect = (socket: Socket<DefaultEventsMap>) => {
    console.log("user connected");
}