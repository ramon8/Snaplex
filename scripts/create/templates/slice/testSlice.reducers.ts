import { TestState, SetIdPayload } from './testSlice.interface'

export const setId = (state: TestState, { payload: { id } }: SetIdPayload) => { state.id = id }
