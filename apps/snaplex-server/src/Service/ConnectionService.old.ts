import { Game } from "@types";
import { Server, Socket } from "socket.io";
import { io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { deckPlayerA, deckPlayerB } from "../db/cards";
import { locationsMock } from "../db/locations";
import { GameInstance } from "./../";

export const ConnectionService = (gameInstances: GameInstance[], io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    const isUserConnected = (userId: string) => {
        console.log("Searching connections for user", userId)
        return gameInstances.findIndex(({ socketA, socketB }: GameInstance) => {
            if (socketA.handshake.query['id'] === userId || socketB?.handshake.query['id'] === userId) return true
            return false
        });
    }

    const getNewGameInstance = (socket: Socket<DefaultEventsMap>): GameInstance => ({
        game: initialGame(),
        socketA: socket,
        socketB: null,
        isWaiting: false,
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
            const roomId = `${instance.socketA.handshake.query['id']}_${instance.socketB.handshake.query['id']}`
            instance.game.id = roomId;

            const [gameA, gameB] = executeTurnOne(instance.game)

            // instance.socketA.join(roomId)
            // instance.socketB.join(roomId)


            instance.socketA.emit("NEW_GAME", gameA);
            instance.socketB.emit("NEW_GAME", gameB);

            instance.socketA.on("SEND", onSend(instance, io, roomId))
            instance.socketB.on("SEND", onSend(instance, io, roomId))

            instance.socketA.join(roomId)
            instance.socketB.join(roomId)




            io.of(roomId).adapter.on("join-room", (room, id) => {
                console.log(`socket ${id} has joined room ${room}`);
            });



            // instance.socketA.on("SEND", (data) => {
            //     console.log(instance.socketB)
            // });
            // instance.socketB.on("SEND", () => {

            // });
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

const initialGame = (): Game => ({
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
})

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

const onSend = (game: GameInstance, io: any, roomId: string) => (data: any) => {
    if (game.isWaiting) {
        console.log(game.game.locations)
        const locations = [...game.game.locations]
        console.log(game);
        game.game.locations = locations.map((location, i) => ({
            ...location,
            playerACards: data.locations[i].playerCards,
            playerBCards: data.locations[i].oponentCards
        }))

        io.to(roomId).emit("TEST_123", { gameInstance: { ...game, socketA: null, socketB: null } })
    } else {
        game.isWaiting = true;
        console.log("setting loactions")
        const newLocations = [...data.locations].map((location: any, i: any) => data.locations[i]);
        game.game.locations = newLocations;
    }

}
