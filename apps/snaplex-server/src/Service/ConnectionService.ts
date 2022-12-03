import { Game } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { deckPlayerA, deckPlayerB } from "../db/cards";
import { locationsMock } from "../db/locations";
import { GameInstance } from "./../";

export const ConnectionService = (gameInstances: GameInstance[]) => {
    const isUserConnected = (userId: string) => {
        console.log("Searching connections for user", userId)
        return gameInstances.findIndex(({ socketA, socketB }: GameInstance) => {
            if (socketA.handshake.query['id'] === userId || socketB?.handshake.query['id'] === userId) return true
            return false
        });
    }

    const getNewGameInstance = (socket: Socket<DefaultEventsMap>): GameInstance => ({
        game: initialGame,
        socketA: socket,
        socketB: null,
    })

    const getPendingGame = (): GameInstance | undefined => {
        return gameInstances.find((game: GameInstance) => game.socketB === null);
    }


    const establishNewConnection = (socket: Socket<DefaultEventsMap>) => {
        const instance = getPendingGame();
        if (!instance) {
            console.log("Conection established with new instance")
            const newGameInstance = getNewGameInstance(socket);
            gameInstances.push(newGameInstance)
        } else {
            console.log("Starting game")
            instance.socketB = socket;

            const [gameA, gameB] = executeTurnOne(instance.game)

            instance.socketA.emit("NEW_GAME", gameA);
            instance.socketB.emit("NEW_GAME", gameB);


            instance.socketA.on("SEND", (data) => {
                console.log(instance.socketB?.listenerCount("SEND"))
            });
            instance.socketB.on("SEND", () => {

            });
        }
    }

    const reconnect = (socket: Socket<DefaultEventsMap>) => {
        socket.emit("RECONNECT", {})

    }

    const onConnect = (socket: Socket<DefaultEventsMap>) => {
        const id = socket.handshake.query['id'];
        console.log("User connected", id)
        if (isUserConnected(id as string) === -1) {

            console.log("Establishing new connections for user", id)
            establishNewConnection(socket);
        } else {
            console.log("Reconecting...", id)
            reconnect(socket)
        }
    }

    return onConnect;
}

const initialGame: Game = {
    id: 'game_1',
    locations: locationsMock,
    maxTurns: 6,
    name: 'Game 1',
    playerA: {
        id: '',
        deck: deckPlayerA,
        hand: [],
        mana: 1,
        name: ''
    },
    playerB: {
        id: '',
        deck: deckPlayerB,
        hand: [],
        mana: 1,
        name: ''
    },
    turn: 1,
}

const executeTurnOne = ({ id, locations, name, playerA, playerB }: Game): Game[] => {
    const playerADeck = [...playerA.deck];
    const playerBDeck = [...playerB.deck];
    const playerAHand = playerADeck.splice(playerADeck.length - 3, 3);
    const playerBHand = playerBDeck.splice(playerBDeck.length - 3, 3);

    const gameA: Game = {
        playerA: {
            ...playerA,
            deck: playerADeck,
            hand: playerAHand
        },
        playerB,
        locations,
        maxTurns: 6,
        turn: 1,
        name,
        id,
    };
    const gameB: Game = {
        playerA: {
            ...playerB,
            deck: playerBDeck,
            hand: playerBHand
        },
        playerB: playerA,
        locations,
        maxTurns: 6,
        turn: 1,
        id,
        name,
    };
    return [gameA, gameB]
}


const nextTurn = (player: 'A' | 'B') => (data: any) => {
    console.log(data, player)
}