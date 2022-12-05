import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { onUserConnect } from './ConnectionService';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200"
    }
});


io.on('connection', onUserConnect);


server.listen(3000, () => {
    console.log('listening on *:3000');
});