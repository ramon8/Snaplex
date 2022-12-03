import { createSlice } from '@reduxjs/toolkit'
import { OponentState, } from './oponentSlice.interface'
import * as reducers from './oponentSlice.reducers'

const initialState: OponentState = {
    id: 'oponent_id'
}

export const oponentSlice = createSlice({
    name: 'oponent',
    initialState,
    reducers,
})

// Action creators are generated for each case reducer function
export const oponentAcions = oponentSlice.actions

export default oponentSlice.reducer