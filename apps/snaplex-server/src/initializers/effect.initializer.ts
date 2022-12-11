import { Effect } from "@types";

export const initialEffect: Effect = {
    id: '',
    type: 'continous',
    name: ''
}

export const createEffect = (effect?: Partial<Effect>): Effect => ({
    ...initialEffect, ...effect
})