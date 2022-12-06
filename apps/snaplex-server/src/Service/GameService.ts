import { Card, Game, GameRoom, Player, START_GAME_PAYLOAD, User, Location, FINISH_TURN_PAYLOAD, NEXT_TURN_PAYLOAD } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { decks } from "../db/cards";
import { locationsMock } from "../db/locations";
const initialHandLength = 3;

export const processDataFinishTurn = (game: Game, playersCards: Card[][][]): NEXT_TURN_PAYLOAD[] => {
    const { locations } = game;
    const playerCadsA = playersCards[0];
    const playerCadsB = playersCards[1];

    const cardsAId = playerCadsA.map(cardsArr => cardsArr.map(card => card.id)).flat();
    const cardsBId = playerCadsB.map(cardsArr => cardsArr.map(card => card.id)).flat();

    game.players[0].hand = game.players[0].hand.filter((card) => !cardsAId.includes(card.id));
    game.players[1].hand = game.players[1].hand.filter((card) => !cardsBId.includes(card.id));

    const playerANextCard = game.players[0].deck.pop();
    const playerBNextCard = game.players[1].deck.pop();

    const playerAHand = [...game.players[0].hand, playerANextCard] as Card[];
    const playerBHand = [...game.players[1].hand, playerBNextCard] as Card[];

    const turn = ++game.turn;

    const locationsA: Location[] = locations.map((_, i) => {
        return {
            ...locations[i],
            playersPower: [playerCadsA[i].reduce((a, b) => a + b.power, 0), playerCadsB[i].reduce((a, b) => a + b.power, 0)],
            playersCards: [playerCadsA[i], playerCadsB[i]],
        }
    });
    const locationsB: Location[] = locations.map((_, i) => {
        return {
            ...locations[i],
            playersPower: [playerCadsB[i].reduce((a, b) => a + b.power, 0), playerCadsA[i].reduce((a, b) => a + b.power, 0)],
            playersCards: [playerCadsB[i], playerCadsA[i]],
        }
    });

    return [{
        locations: locationsA,
        maxTurns: game.maxTurns,
        hand: playerAHand,
        mana: turn,
        turn: turn,
    }, {
        locations: locationsB,
        maxTurns: game.maxTurns,
        hand: playerBHand,
        mana: turn,
        turn: turn,
    }]
}

export const processInitialData = (gameRoom: GameRoom): START_GAME_PAYLOAD[] => {
    gameRoom.game.locations = locationsMock;
    gameRoom.game.players.forEach((player, i) => {
        const deck = decks[i];
        player.hand = deck.splice(deck.length - initialHandLength, initialHandLength);
        player.deck = deck;
        player.mana = 1;
    })

    return gameRoom.game.players.map(({ id, deck, hand, mana, name }: Player, i: number): START_GAME_PAYLOAD => {
        return { deck, hand, id, locations: gameRoom.game.locations, mana: 1 }
    })
}

export const processData = ({ game: { players, locations } }: GameRoom): START_GAME_PAYLOAD[] => {
    locations = locationsMock;
    return players.map(({ id }: Player, i: number): START_GAME_PAYLOAD => {
        const deck: Card[] = decks[i];
        const hand: Card[] = deck.splice(deck.length - initialHandLength, initialHandLength);
        return { deck, hand, id, locations: locations, mana: 1, }
    })
}

export const processDataById = ({ game }: GameRoom, userId: string): START_GAME_PAYLOAD => {
    const { deck, hand, id, mana, name } = game.players.find(player => player.id === userId) as Player
    return {
        locations: game.locations,
        deck,
        hand, id,
        mana: 1,
    }
}

export const initializeGameRoom = (userId: string, socket: Socket<DefaultEventsMap>): GameRoom => ({
    game: initializeGame(userId),
    id: `room_${userId}`,
    name: '',
    users: [
        {
            id: userId,
            playersCards: [],
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
        playersCards: [],
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