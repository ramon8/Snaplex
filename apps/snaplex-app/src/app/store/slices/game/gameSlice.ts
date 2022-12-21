import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { oponentCardsMocks, oponentFiguresMocks, playerCardsMocks, playerFiguresMocks } from '@store/mocks';
import { Card, Figure } from '@types'

export interface Game {
  playerCards: Card[];
  oponentCards: Card[];
  playerFigures: Figure[];
  oponentFigures: Figure[];
  currentDragginCard: Card | null;
}

const initialState: Game = {
  currentDragginCard: null,
  playerCards: playerCardsMocks,
  oponentCards: oponentCardsMocks,
  playerFigures: playerFiguresMocks,
  oponentFigures: oponentFiguresMocks,
}

export const counterSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentDragginCard: (state, { payload: { card } }) => {
      state.currentDragginCard = card;
    },

    setPlayerCards: (state, { payload: { cards } }) => {
      state.playerCards = cards;
    },
    setOponentCards: (state, { payload: { cards } }) => {
      state.oponentCards = cards;
    },

    setPlayerFigures: (state, { payload: { figures } }) => {
      state.playerFigures = figures;
    },

    addNewPlayersFigure: (state, { payload: { figures } }) => {
      console.log({ figures })
      state.playerFigures = [...state.playerFigures, figures];
    },
    setOponentFigures: (state, { payload: { figures } }) => {
      state.oponentFigures = figures;
    }
  },
})

export const gameActions = counterSlice.actions

export default counterSlice.reducer
