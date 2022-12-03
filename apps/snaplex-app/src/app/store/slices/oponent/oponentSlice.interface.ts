import { PayloadAction } from "@reduxjs/toolkit";

export interface OponentState {
    id: string
}

export interface SetId {
    id: string
}

export type SetIdPayload = PayloadAction<SetId>