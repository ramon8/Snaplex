import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import { ConnectionService } from './Service/ConnectionService';
import { Game } from '@types'
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200"
    }
});

export interface GameInstance {
    socketA: Socket<DefaultEventsMap>;
    socketB: Socket<DefaultEventsMap> | null;
    game: Game;
}

const gameInstances: GameInstance[] = []

io.on('connection', ConnectionService(gameInstances));

server.listen(3000, () => {
    console.log('listening on *:3000');
});