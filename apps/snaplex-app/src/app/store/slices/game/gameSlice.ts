import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '@types'



interface GameState {
  player: GameObject;
  walls: GameObject[];
  score: number;
}

const initialState: GameState = {
  player: {
    name: 'player',
    x: 0,
    y: 0,
    sizeH: 1,
    sizeW: 1,
  },
  score: 0,
  walls: []
}

export const counterSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
})


export interface SetGame { game: Game }

export const gameActions = counterSlice.actions

export default counterSlice.reducer
