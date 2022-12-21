import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { onConnect } from './events/onConnect';
import AuthController from './routes/auth'
import './database';

dotenv.config();
const app = express();
app.use(cors({
  origin: '*'
}));

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:4200"
//   }
// });

app.use(express.json());

// Routes
app.use('/api/auth', AuthController);

// io.on('connection', onConnect);

server.listen(3000, () => {
  console.log('listening on *:3000');
});
