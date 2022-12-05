import { Card } from "../Card";
import { Game } from "../Game";
import { Location } from '../Location';

export interface START_GAME_RESPONSE {
    id: string,
    game: Game
}
export interface NEXT_TURN_PAYLOAD {
    locations: Location[],
    hand: Card[],
    mana: number,
} 