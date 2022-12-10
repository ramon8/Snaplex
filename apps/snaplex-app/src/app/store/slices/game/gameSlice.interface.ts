import { HeaderProps, LocationProps } from "@components";
import { PayloadAction } from "@reduxjs/toolkit"

export interface GameState {
  id: string
  maxTurns: number
  turn: number
  locations: LocationProps[]
  winner?: string | null
  timer?: boolean;
}

export interface SetGame {
  game: GameState
  timer: boolean
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

export interface SetWinner {
  winner?: string | null,
}

export interface SetTimer {
  timer: boolean,
}

export type SetIdPayload = PayloadAction<SetId>
export type SetMaxTurnsPayload = PayloadAction<SetMaxTurns>
export type SetTurnsPayload = PayloadAction<SetTurns>

export type SetLocationsPayload = PayloadAction<SetLocations>
export type SetLocationPayload = PayloadAction<SetLocation>

export type SetGamePayload = PayloadAction<SetGame>
export type SetGameWinnerPayload = PayloadAction<SetWinner>
export type SetTimerPayload = PayloadAction<SetTimer>
