import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@types";

export type ActionType = 'play' | 'move'

export type ActionState = Action[]

export interface SetAction {
  action: Action
}

export type SetActionPayload = PayloadAction<SetAction>
