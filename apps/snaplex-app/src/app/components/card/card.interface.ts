export type CardType = 'default' | 'detail';

export interface CardProps {
    power: number,
    cost: number,
    id: string;
    name: string;
    type?: CardType;
    icon?: string;
    image?: string;
    description?: string;
}