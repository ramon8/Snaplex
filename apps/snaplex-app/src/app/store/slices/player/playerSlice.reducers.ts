import { PlayerState, SetDeckPayload, SetHandPayload, SetIdPayload, SetManaPayload } from './playerSlice.interface'

export const setId = (state: PlayerState, { payload: { id } }: SetIdPayload) => { state.id = id }

export const setHand = (state: PlayerState, { payload: { hand } }: SetHandPayload) => { state.hand = hand }
export const setDeck = (state: PlayerState, { payload: { deck } }: SetDeckPayload) => { state.deck = deck }
export const setMana = (state: PlayerState, { payload: { mana } }: SetManaPayload) => { state.mana = mana }
