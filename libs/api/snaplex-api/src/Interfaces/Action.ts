import { Card } from "./Card"

export type ActionType = 'play' | 'move';

export interface Action {
  id: string
  type: ActionType
  card: Card
}
