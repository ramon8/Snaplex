import { createSlice } from '@reduxjs/toolkit'
import { Action } from '@types'
import * as reducers from './actionsSlice.reducers'

const initialState: Action[] = []

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers,
})

// Action creators are generated for each case reducer function
export const actionsActions = actionsSlice.actions

export default actionsSlice.reducer
