import { HeaderProps, LocationProps } from "@components";
import { PayloadAction } from "@reduxjs/toolkit"

export interface GameState {
    id: string
    maxTurns: number
    turn: number
    locations: LocationProps[]
    player: string,
    oponent: string,
}

export interface SetId {
    id: string
}

export interface SetMaxTurns {
    value: number
}

export interface SetTurns {
    value: number
}

export interface SetLocations {
    locations: LocationProps[]
}

export interface SetLocation {
    location: LocationProps,
}

export type SetIdPayload = PayloadAction<SetId>
export type SetMaxTurnsPayload = PayloadAction<SetMaxTurns>
export type SetTurnsPayload = PayloadAction<SetTurns>

export type SetLocationsPayload = PayloadAction<SetLocations>
export type SetLocationPayload = PayloadAction<SetLocation>