import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '@types'


export interface SetGame { game: Game }
export type SetGamePayload = PayloadAction<SetGame>

const initialState: Game = {
  firstToReveal: '',
  maxTurns: 0,
  sites: [],
  turn: 0,
  turnStartedAt: new Date().getTime(),
  maxTurnTime: 0,
  winner: ''
}

export const counterSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, { payload: { game: { firstToReveal, maxTurns, sites, turn, turnStartedAt, winner, maxTurnTime } } }: SetGamePayload) => {
      state.firstToReveal = firstToReveal;
      state.maxTurns = maxTurns;
      state.sites = sites;
      state.turn = turn;
      state.turnStartedAt = turnStartedAt;
      state.winner = winner;
      state.maxTurnTime = maxTurnTime;
    }
  },
})

export const gameActions = counterSlice.actions

export default counterSlice.reducer
