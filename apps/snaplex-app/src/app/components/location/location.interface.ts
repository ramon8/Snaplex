import { Instance } from '@types'
import { CardProps } from '..';

export interface LocationProps extends Instance {
    playersPower: number[];
    playersCards: CardProps[][];

    description?: string;
}