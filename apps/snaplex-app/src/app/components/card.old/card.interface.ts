export type CardType = 'hand' | 'location';

export interface CardProps {
    id: string;
    name: string;

    cost: number;
    power: number;

    description?: string;
    icon?: string;

    type?: CardType;
    drag?: boolean;

    index?: number;
}