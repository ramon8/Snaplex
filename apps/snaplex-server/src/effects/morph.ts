import { Card, GameRoom, Site } from "@types";
import { playerKeyType } from "../types";

/**
 * On Reveal: Become a copy of a random card in your opponent`s hand.
 */
const handler = (gameRoom: GameRoom, playerId: string): GameRoom => {
    const newGameRoom = { ...gameRoom }
    let playerKey: playerKeyType = 'player';
    if (gameRoom.player.id !== playerId) playerKey = 'oponent';

    return newGameRoom;
};

export default handler