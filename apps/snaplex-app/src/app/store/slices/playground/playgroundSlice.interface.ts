import { PayloadAction } from "@reduxjs/toolkit";

export interface PlaygroundState {
    selectedCard?: string;
}

export interface SetSelectedCard {
    cardId?: string
}

export type SetSelectedCardPayload = PayloadAction<SetSelectedCard>