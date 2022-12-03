import { OponentState, SetIdPayload } from './oponentSlice.interface'

export const setId = (state: OponentState, { payload: { id } }: SetIdPayload) => { state.id = id }
