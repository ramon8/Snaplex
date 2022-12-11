import { Action, Card } from "../Interfaces";
import { Entity } from "./Entity.model";

export interface Player extends Entity {
    mana: number;

    /** The power of all the locations */
    power: number;

    turnFinished: boolean;

    /** The list of actions that the player has done during the game */
    actions: Action[][];

    hand: Card[];
    deck: Card[];
}