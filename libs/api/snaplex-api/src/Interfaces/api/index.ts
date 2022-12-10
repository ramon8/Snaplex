import { Action } from '../Action'
import { Card } from '../Card'
import { Location } from '../Location'

export * from './startGameResponse'

export interface EmitStartGamePayload {
  locations: Location[],
  deck: Card[],
  hand: Card[],
  turn: number,
  maxTurns: number,
  mana: number,
  userId: string, 
  winner?: string
}


export interface EmitReconnectGamePayload {
  locations: Location[],
  deck: Card[],
  hand: Card[],
  turn: number,
  maxTurns: number,
  mana: number,
  userId: string,
  winner?: string | null
}

export interface EmitNextTurnPayload {
  locations: Location[],
  deck: Card[],
  hand: Card[],
  turn: number,
  maxTurns: number,
  mana: number,
  userId: string
}


export interface EmitFinishTurnPayload {
  actions: Action[]
}
