import { CardType } from '@types';
import morph from './morph';

export const effects: Partial<Record<CardType, any>> = {
    morph,
}