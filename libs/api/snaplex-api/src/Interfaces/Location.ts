import { Card } from "./Card"
import { Instance } from "./Instance"

export interface Location extends Instance {
  playersPower: number[]
  playersCards: Card[][]
  description?: string
}
