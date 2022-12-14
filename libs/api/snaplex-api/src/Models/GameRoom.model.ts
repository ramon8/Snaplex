import { Entity, Game, Player } from ".";

export interface GameRoom extends Entity {
    game: Game;

    /** store snapShots for each turn */
    snapShots: Game[]

    /** If the gameRoom is waiting a player to join */
    isWaiting: boolean;

    /** The first user that enters the GameRoom */
    player: Player;
    /** The player that joins the GameRoom */
    oponent: Player;

    /** The setTimeOut listener so we can cancelit */
    timeOut?: any


}