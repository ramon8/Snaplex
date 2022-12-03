import { Cerezas, Melocotón, Pera } from '@mocks/card.mocks'
import { createSlice } from '@reduxjs/toolkit'
import { PlayerState, } from './playerSlice.interface'
import * as reducers from './playerSlice.reducers'

const initialState: PlayerState = {
    id: 'player_id',
    deck: [],
    hand: [],
    mana: 1,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers,
})

// Action creators are generated for each case reducer function
export const playerActions = playerSlice.actions

export default playerSlice.reducer