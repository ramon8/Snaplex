import { createSlice } from '@reduxjs/toolkit'
import { locationsMock } from '@mocks/location.mock'
import { GameState } from './gameSlice.interface'
import * as reducers from './gameSlice.reducers'


const initialState: GameState = {
    id: 'game_id',

    maxTurns: 6,
    turn: 1,

    locations: locationsMock,
    player: 'Ramon',
    oponent: 'Alex',
}

export const counterSlice = createSlice({
    name: 'game',
    initialState,
    reducers,
})

// Action creators are generated for each case reducer function
export const gameActions = counterSlice.actions

export default counterSlice.reducer