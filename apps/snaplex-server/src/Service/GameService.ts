import { Card, Game, GameRoom, Player, START_GAME_PAYLOAD, User, Location } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { deckPlayerA, deckPlayerB } from "../db/cards";

export const processInitialData = (gameRoom: GameRoom): START_GAME_PAYLOAD[] => {
    const locations: Location[] = [];
    return gameRoom.users.map(({ id }: User, i: number): START_GAME_PAYLOAD => {
        const player = gameRoom.game.players[i];
        const hand: Card[] = [];
        const deck: Card[] = [];
        return {
            deck,
            hand,
            id,
            locations: locations
        }
    })
}


export const initializeGameRoom = (userId: string, socket: Socket<DefaultEventsMap>): GameRoom => ({
    game: initializeGame(userId),
    id: `room_${userId}`,
    name: '',
    users: [
        {
            id: userId,
            isWaiting: false,
            name: '',
            socket: socket
        }
    ]
})

export const initializeGame = (userId: string): Game => ({
    id: '',
    name: '',
    maxTurns: 6,
    turn: 1,
    locations: [],
    players: [{
        deck: [],
        hand: [],
        id: userId,
        mana: 1,
        name: ''
    }]
})

export const joinGameRoom = (gameRoom: GameRoom, userId: string, socket: Socket<DefaultEventsMap>) => {
    socket.join(gameRoom.id)
    joinGame(gameRoom.game, userId)
    gameRoom.users.push({
        id: userId,
        isWaiting: false,
        name: '',
        socket: socket
    })
}

export const joinGame = (game: Game, userId: string) => {
    game.players.push({
        deck: [],
        hand: [],
        id: userId,
        mana: 1,
        name: ''
    })
}

export const shufleDeck = (deck: Card[]): Card[] => {
    let randomIndex, currentIndex;
    currentIndex = deck.length;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}