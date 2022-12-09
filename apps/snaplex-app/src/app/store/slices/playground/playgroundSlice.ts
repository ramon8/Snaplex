import { createSlice } from '@reduxjs/toolkit'
import { PlaygroundState, } from './playgroundSlice.interface'
import * as reducers from './playgroundSlice.reducers'

const initialState: PlaygroundState = {
    selectedCard: undefined
}

export const playgroundSlice = createSlice({
    name: 'playground',
    initialState,
    reducers,
})

// Action creators are generated for each case reducer function
export const playgroundActions = playgroundSlice.actions

export default playgroundSlice.reducer