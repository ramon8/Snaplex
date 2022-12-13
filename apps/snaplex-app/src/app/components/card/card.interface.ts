import { Card } from "@types";

export type CardType = 'default' | 'small' | 'detail';

export interface CardProps extends Card {
    type?: CardType;
}