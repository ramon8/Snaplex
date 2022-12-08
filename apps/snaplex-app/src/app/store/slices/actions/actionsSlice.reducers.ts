import { Action } from "@types"
import { ActionState, SetActionPayload, SetActionsPayload } from "./actionsSlice.interface"


export const setActions = (state: Action[], { payload: { actions } }: SetActionsPayload) => actions;

export const clearActions = (state: Action[]) => [];

export const setAction = (state: Action[], { payload: { action } }: SetActionPayload) => { state.push(action) };
