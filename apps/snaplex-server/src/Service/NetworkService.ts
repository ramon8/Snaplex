import { FINISH_TURN_PAYLOAD, GameRoom, NEXT_TURN_PAYLOAD, START_GAME_PAYLOAD, User } from "@types";
import { processDataFinishTurn } from "./GameService";

export const onStartGame = (gameRoom: GameRoom): START_GAME_PAYLOAD => ({
    id: '',
    deck: [],
    hand: [],
    locations: [],
    mana: 1,
})

export const onFinishTurn = (gameRoom: GameRoom) => ({ userId, playersCards }: FINISH_TURN_PAYLOAD) => {
    const { users, game } = gameRoom;
    // Is the other player waiting?
    if (isPlayerWaiting(userId, users)) {
        // Is the last turn?
        if (isEndOfTheGame(gameRoom)) {

        } else {
            const user = users.find(user => user.id === userId) as User;
            user.playersCards = playersCards;
            const data: NEXT_TURN_PAYLOAD[] = processDataFinishTurn(game, users.map(users => users.playersCards))
            gameRoom.game.locations = data[0].locations;
            gameRoom.users.forEach((user, i) => {
                user.playersCards = [];
                user.socket.emit("NEXT_TURN", data[i])
            })
        }
    } else {
        const user = gameRoom.users.find(user => user.id === userId)
        if (user) {
            user.playersCards = playersCards
        }
    }
}

export const isPlayerWaiting = (userId: string, users: User[]): boolean => {
    const user = users.find(user => user.id !== userId) as User;
    return user.playersCards.length > 0;
}

export const isEndOfTheGame = ({ game: { turn, maxTurns } }: GameRoom): boolean => {
    return turn === maxTurns - 1;
}