import { FINISH_TURN_PAYLOAD, GameRoom, START_GAME_PAYLOAD } from "@types";

export const onStartGame = (gameRoom: GameRoom): START_GAME_PAYLOAD => ({
    id: '',
    deck: [],
    hand: [],
    locations: []
})

export const onFinishTurn = (gameRoom: GameRoom) => ({ roomId, userId, locations }: FINISH_TURN_PAYLOAD) => {
    // Is the other player waiting?
    if (isPlayerWaiting(userId, gameRoom)) {
        // Is the last turn?
        if (isEndOfTheGame(gameRoom)) {

        }
    } else {
        const user = gameRoom.users.find(user => user.id === userId)
        if (user) user.isWaiting = true;
    }
}

export const isPlayerWaiting = (userId: string, { users }: GameRoom): boolean => {
    return !!users.find(user => user.id !== userId)?.isWaiting;
}

export const isEndOfTheGame = ({ game: { turn, maxTurns } }: GameRoom): boolean => {
    return turn === maxTurns - 1;
}