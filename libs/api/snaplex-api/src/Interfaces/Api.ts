import { Card } from "./Card"
import { Location } from './Location'

export interface CONNECT_PAYLOAD {
    id: string
}

export interface START_GAME_PAYLOAD {
    id: string
    hand: Card[]
    deck: Card[]
    mana: number
    locations: Location[]
}

export interface RECONNECT_GAME_PAYLOAD extends START_GAME_PAYLOAD { }

export interface FINISH_TURN_PAYLOAD {
    userId: string
    playersCards: Card[][]
}

export interface NEXT_TURN_PAYLOAD {
    locations: Location[]
    turn: number
    maxTurns: number
    mana: number
    hand: Card[]
}

export interface FINISH_GAME_PAYLOAD extends NEXT_TURN_PAYLOAD {
    winner: string
}