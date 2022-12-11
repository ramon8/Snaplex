import { Site } from '@types'
import { CardProps } from '..';

export interface SiteProps extends Site {
    playerPower: number;
    oponentPower: number;

    playerCards: CardProps[];
    oponentCards: CardProps[];

    description?: string;
}