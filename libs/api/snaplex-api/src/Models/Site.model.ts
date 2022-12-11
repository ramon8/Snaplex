
import { Card } from "./Card.model";
import { Effect } from "./Effect.model";
import { Entity } from "./Entity.model";

export interface Site extends Entity {
    playerCards: Card[];
    oponentCards: Card[];

    playerPower: number;
    oponentPower: number;

    maxCards: number;

    /** If the location can be read */
    visible: boolean;

    /** Alows the ability to play cards here */
    enabled: boolean;

    description?: string;
    image?: string;

    /** The type of effect that the site does when revealed or each turn.*/
    effect?: Effect;
}