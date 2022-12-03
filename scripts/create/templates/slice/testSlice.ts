import { createSlice } from '@reduxjs/toolkit'
import { TestState, } from './testSlice.interface'
import * as reducers from './testSlice.reducers'

const initialState: TestState = {
    id: 'test_id'
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers,
})

// Action creators are generated for each case reducer function
export const testActions = testSlice.actions

export default testSlice.reducer