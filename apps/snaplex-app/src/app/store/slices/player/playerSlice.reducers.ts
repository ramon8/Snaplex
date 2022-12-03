import { PlayerState, SetDeckPayload, SetHandPayload, SetIdPayload, SetManaPayload, PlayerPayload } from './playerSlice.interface'

export const setId = (state: PlayerState, { payload: { id } }: SetIdPayload) => { state.id = id }

export const setPlayer = (state: PlayerState, { payload: { player } }: PlayerPayload) => {
    state.deck = player.deck
    state.hand = player.hand
    state.id = player.id
    state.mana = player.mana
}
export const setHand = (state: PlayerState, { payload: { hand } }: SetHandPayload) => { state.hand = hand }
export const setDeck = (state: PlayerState, { payload: { deck } }: SetDeckPayload) => { state.deck = deck }
export const setMana = (state: PlayerState, { payload: { mana } }: SetManaPayload) => { state.mana = mana }
