import { PayloadAction } from "@reduxjs/toolkit";

export interface TestState {
    id: string
}

export interface SetId {
    id: string
}

export type SetIdPayload = PayloadAction<SetId>