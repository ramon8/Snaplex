import { CardProps } from "@components/card"
import { PayloadAction } from "@reduxjs/toolkit"
import { Player } from "@types"

export interface PlayerState {
    id: string
    deck: CardProps[]
    hand: CardProps[]
    mana: number
}

export interface SetId {
    id: string
}

export interface SetDeck {
    deck: CardProps[]
}

export interface SetHand {
    hand: CardProps[]
}

export interface SetMana {
    mana: number
}

export interface SetPlayer {
    player: PlayerState
}

export type SetIdPayload = PayloadAction<SetId>
export type SetDeckPayload = PayloadAction<SetDeck>
export type SetHandPayload = PayloadAction<SetHand>
export type SetManaPayload = PayloadAction<SetMana>
export type PlayerPayload = PayloadAction<SetPlayer>