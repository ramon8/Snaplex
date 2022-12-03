import { Instance } from '@types'
import { CardProps } from '..';

export interface LocationProps extends Instance {
    playerPower: number;
    oponentPower: number;

    playerCards: CardProps[];
    oponentCards: CardProps[];

    description?: string;
}