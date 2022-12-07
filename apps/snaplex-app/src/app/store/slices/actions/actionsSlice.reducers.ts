import { Action } from "@types"
import { ActionState, SetActionPayload } from "./actionsSlice.interface"


export const setAction = (state: Action[], { payload: { action } }: SetActionPayload) => { state.push(action) }
