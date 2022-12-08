import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@types";

export type ActionType = 'play' | 'move'

export type ActionState = Action[]

export interface SetAction {
  action: Action
}

export interface SetActions {
  actions: Action[]
}

export type SetActionPayload = PayloadAction<SetAction>
export type SetActionsPayload = PayloadAction<SetActions>
