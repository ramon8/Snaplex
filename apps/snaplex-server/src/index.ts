import { GameRoom } from '@types';
import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { onUserConnect } from './Service/ConnectionService';

const initialize = () => {

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:4200"
        }
    });

    const gameRooms: GameRoom[] = [];

    io.on('connection', onUserConnect(gameRooms, io));

    server.listen(3000, console.log);
}

initialize();