import { PlaygroundState, SetSelectedCardPayload } from './playgroundSlice.interface'

export const setSelectedCard = (state: PlaygroundState, { payload: { cardId } }: SetSelectedCardPayload) => { state.selectedCard = cardId }
