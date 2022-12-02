import { Card } from "./Card";
import { Instance } from "./Instance";

export interface Player extends Instance {
    deck: Card[],
    hand: Card[],
    mana: number;
}