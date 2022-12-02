import { Card } from "./Card";
import { Instance } from "./Instance";

export interface Location extends Instance {
    playerAPower: number;
    playerBPower: number;

    playerACards: Card[];
    playerBCards: Card[];

    description?: string;
}