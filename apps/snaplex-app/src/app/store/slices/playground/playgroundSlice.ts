import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlaygroundState {
    selectedCard?: string;
}

interface SetPlayground {
    playground: PlaygroundState
}

type SetPlaygroundPayload = PayloadAction<SetPlayground>

const initialState: PlaygroundState = {
    selectedCard: undefined
}

export const playgroundSlice = createSlice({
    name: 'playground',
    initialState,
    reducers: {
        setPlayground: (state, { payload: { playground: { selectedCard } } }: SetPlaygroundPayload) => {
            state.selectedCard = selectedCard;
        }
    },
})

// Action creators are generated for each case reducer function
export const playgroundActions = playgroundSlice.actions

export default playgroundSlice.reducer