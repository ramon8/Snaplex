import { Card } from "./Card";

export interface Player {
    id: string;
    userName: string;

    cards: Card[]
}