import { Card } from "@types";
import { createEffect } from "./effect.initializer";

const initialSite: Card = {
    cardType: 'blueMarvel',
    cost: 0,
    effect: createEffect(),
    id: '',
    power: 0,
    revealed: false,
}

export const createCard = (card?: Partial<Card>): Card => ({
    ...initialSite, ...card
})