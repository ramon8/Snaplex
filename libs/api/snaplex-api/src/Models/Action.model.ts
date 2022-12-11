import { Card } from "../Models";
import { Entity } from "./Entity.model";

export type ActionType = 'play' | 'move';

export interface Action extends Entity {
    type: ActionType;
    locationId: string;
    card: Card;
}