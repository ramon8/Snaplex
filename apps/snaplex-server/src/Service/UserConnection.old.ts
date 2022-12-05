import { Game, NEXT_TURN_PAYLOAD, Player, Location } from "@types";
import { Server, Socket } from "socket.io";
import { io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { deckPlayerA, deckPlayerB } from "../db/cards";
import { locationsMock } from "../db/locations";
import { GameRoom, PlayerInstance } from "..";
import util from 'util';

export const UserConnection = (gameRooms: GameRoom[], io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    return (socket: Socket<DefaultEventsMap>) => {
        const userId = socket.handshake.query['id'] as string;

        const adaptNewTurn = (playerBLocations: Location[], playerALocations: Location[]) => {
            const roomId = gameRooms.findIndex((gameRoom: GameRoom) => {
                return gameRoom.players.find((player: PlayerInstance) => player.id === userId)
            });
            const locationsA = playerALocations.map((location: Location, i) => ({ ...location, playerBCards: playerBLocations[i].playerACards }));
            const locationsB = locationsA.map((location: Location): Location => {
                const prevVal = location.playerACards;
                return {
                    ...location,
                    playerACards: location.playerBCards,
                    playerBCards: prevVal,
                }
            })
            const { game } = gameRooms[roomId]
            const playerAHand: any = game.playerA.deck.pop();
            const playerBHand: any = game.playerB?.deck.pop();
            game.turn++;

            console.log("A:", locationsA);
            console.log("B:", locationsB);

            gameRooms[roomId].players[0].socket.emit("NEXT_TURN", { mana: game.turn, locations: locationsA, card: playerAHand });
            gameRooms[roomId].players[1].socket.emit("NEXT_TURN", { mana: game.turn, locations: locationsB, card: playerBHand });

        }

        const nextTurn = (data: any) => {
            // Find if someone is waiting
            const sessionId = gameRooms.findIndex((gameRoom: GameRoom) => {
                return gameRoom.players.find((player: PlayerInstance) => player.id === userId)
            });

            const isWaiting = gameRooms[sessionId].players.filter(player => {
                const isWaiting = player.isWaiting;
                player.isWaiting = false;
                return isWaiting;
            }).length > 0;

            if (isWaiting) {
                adaptNewTurn(data.locations, gameRooms[sessionId].players.find(player => player.id != userId)?.turnData);
                // io.to(data.roomId).emit("NEXT_TURN", )
            } else {
                const playerIndex = gameRooms[sessionId].players.findIndex(player => player.id === userId);
                const player = gameRooms[sessionId].players[playerIndex];
                player.turnData = data.locations;
                player.isWaiting = true;
            }

        }

        // Return the instance of the user if exists
        const reconnectToSession = () => {
            console.log(`${userId}: Trying to reconnect`)
            const roomId = gameRooms.findIndex((gameRoom: GameRoom) => {
                return gameRoom.players.find((player: PlayerInstance) => player.id === userId)
            });
            if (roomId !== -1) {
                const gameRoom = gameRooms[roomId];
                socket.join(gameRoom.id);
                socket.emit("RECONNECT", { id: userId, game: gameRoom.game })
                console.log(`${userId}: User reconnected`)
            } else console.log(`${userId}: Recnnection failed`)
            return roomId;
        }

        // Finds for a waiting session
        const findWaitingSesion = () => {
            return gameRooms.findIndex((gameRoom: GameRoom) => {
                return gameRoom.players.length <= 1;
            });
        }

        // Create a new sesion
        const createNewSession = () => {
            const newGameRoom = {
                game: initialGame({
                    deck: deckPlayerA,
                    hand: [],
                    id: userId,
                    mana: 1,
                    name: userId
                }),
                id: `room_${userId}`, // TODO set id
                players: [{
                    socket,
                    id: userId,
                    isWaiting: false,
                }]
            }
            gameRooms.push(newGameRoom);
            console.log(`${userId}: Session ${newGameRoom.id} created`);
        }

        // Create a new sesion
        const joinSession = () => {
            console.log(`${userId}: Searching session to join`);
            const waitingRoomId = findWaitingSesion();
            const gameRoom = { ...gameRooms[waitingRoomId] };
            if (waitingRoomId !== -1) {
                console.log(`${userId}: Session ${gameRoom.id} found`);
                gameRoom.players.push({
                    socket: socket,
                    isWaiting: false,
                    id: userId,
                });
                gameRoom.game = updateInitialGame(gameRoom.game, {
                    deck: deckPlayerB,
                    hand: [],
                    id: userId,
                    mana: 1,
                    name: userId
                });
                gameRooms[waitingRoomId] = gameRoom;
                gameRoom.players.forEach(({ socket, id }: PlayerInstance) => {
                    socket.join(gameRoom.id);
                    socket.emit("START_GAME", { id, game: gameRoom.game });
                    console.log(`${userId}: User ${id} joined Room ${gameRoom.id}`)
                });

            } else console.log(`${userId}: Session not found`);
            return waitingRoomId;
        }

        // Buscar si el user esta en una room
        if (reconnectToSession() === -1) {
            // Find a nes sesion and if true conect to it
            if (joinSession() === -1) {
                createNewSession();
            }
        }
        socket.on("NEXT_TURN", nextTurn)
    }
}

const initialGame = (playerA: Player): Game => ({
    id: `room_${playerA.id}`,
    locations: locationsMock,
    maxTurns: 6,
    name: '',
    playerA: initializePlayer(playerA),
    playerB: null,
    turn: 1,
})

const updateInitialGame = (initialGame: Game, playerB: Player): Game => ({
    ...initialGame,
    playerB: initializePlayer(playerB),
})

const shufleDeck = (deck: any[]): any[] => {
    let currentIndex = deck.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

const initializePlayer = (player: Player): Player => {
    const deck = shufleDeck(player.deck);
    const hand = deck.splice(deck.length - 3, 3);
    return {
        ...player,
        deck,
        hand,
    }
}