import { Card } from "./Card.model";
import { Site } from "./Site.model";

export interface EmitData {
    userId: string;

    deck: Card[];
    hand: Card[];
    sites: Site[];

    turn: number;
    maxTurns: number;
    mana: number;

    turnStartedAt: number;
    maxTurnTime: number;

    isfirstToReveal?: boolean;
    winner?: string;
}