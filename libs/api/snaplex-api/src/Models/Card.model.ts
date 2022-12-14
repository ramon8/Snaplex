import { Effect } from "./Effect.model";
import { Entity } from "./Entity.model";

export type CardType =
    'hulk' |
    'theThing' |
    'cyclops' |
    'pg' |
    'mistyKnight' |
    'morph' |
    'hawkEye' |
    'rocketRacoon' |
    'Klaw' |
    'captainAmerica' |
    'ironMan' |
    'kazar' |
    'blueMarvel' |
    'misterFantastic' |
    'antMan' |
    'thePunisher' |
    'kraven' |
    'nightcrawler' |
    'vision' |
    'jpg' |
    'quicksilver' |
    'americaChavez' |
    'domino'

export interface Card extends Entity {
    cost: number;
    power: number;

    revealed: boolean;

    /** The type of the card. Ex: `blueMarvel` */
    cardType: CardType;

    /** The type of effect that the card does when played. Ex: `plusOneToAll` */
    effect: Effect; // TODO: Post MVP, could a card have more than one effect? Effect[]
    description?: string;
    image?: string;
    icon?: string; // Testing porpouse
}