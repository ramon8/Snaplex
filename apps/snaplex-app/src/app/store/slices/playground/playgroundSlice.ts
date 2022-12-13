import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlaygroundState {
  selectedCard?: string;
  draggingCard?: string;
  hoveredSite?: string;
}

interface SetPlayground {
  playground: PlaygroundState
}

type SetPlaygroundPayload = PayloadAction<SetPlayground>

const initialState: PlaygroundState = {
  selectedCard: undefined,
  hoveredSite: undefined,
  draggingCard: undefined
}

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setPlayground: (state, { payload: { playground: { selectedCard, hoveredSite, draggingCard } } }: SetPlaygroundPayload) => {
      state.selectedCard = selectedCard;
      state.hoveredSite = hoveredSite;
      state.draggingCard = draggingCard;
    }
  },
})

// Action creators are generated for each case reducer function
export const playgroundActions = playgroundSlice.actions

export default playgroundSlice.reducer
