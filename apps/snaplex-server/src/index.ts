import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { onConnect } from './events/onConnect';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200"
  }
});

io.on('connection', onConnect);


server.listen(3000, () => {
  console.log('listening on *:3000');
});
