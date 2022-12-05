import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import { UserConnection } from './Service/UserConnection';
import { Game } from '@types'
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200"
    }
});

export interface PlayerInstance {
    socket: Socket<DefaultEventsMap>;
    isWaiting?: boolean;
    id: string;
    turnData?: any;
}

//: Record<string, >

export interface GameRoom {
    players: PlayerInstance[]
    game: Game;
    id: string;
}

const gameRooms: GameRoom[] = []

io.on('connection', UserConnection(gameRooms, io));


server.listen(3000, () => {
    console.log('listening on *:3000');
});