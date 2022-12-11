import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action, Player } from '@types'

export interface SetPlayer { player: Player }
export type SetPlayerPayload = PayloadAction<SetPlayer>

const initialState: Player = {
  id: '',
  deck: [],
  hand: [],
  mana: 1,
  actions: [],
  power: 0,
  turnFinished: false,
  socket: undefined,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, { payload: { player: { actions, deck, hand, id, mana, power, turnFinished, name } } }: SetPlayerPayload) => {
      state.id = id
      state.deck = deck
      state.hand = hand
      state.mana = mana
      state.actions = actions
      state.name = name
      state.power = power
      state.turnFinished = turnFinished;
    },
  },
})

export const playerActions = playerSlice.actions

export default playerSlice.reducer
