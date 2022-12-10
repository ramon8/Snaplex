import { LocationProps } from '@components/location'
import { GameState, SetGamePayload, SetGameWinnerPayload, SetIdPayload, SetLocationPayload, SetLocationsPayload, SetMaxTurnsPayload, SetTimerPayload, SetTurnsPayload } from './gameSlice.interface'

export const setId = (state: GameState, { payload: { id } }: SetIdPayload) => { state.id = id }
export const setMaxTurns = (state: GameState, { payload: { value } }: SetMaxTurnsPayload) => { state.maxTurns = value }
export const setTurns = (state: GameState, { payload: { value } }: SetTurnsPayload) => { state.turn = value }

export const setLocations = (state: GameState, { payload: { locations } }: SetLocationsPayload) => { state.locations = locations }

export const setLocation = (state: GameState, { payload: { location } }: SetLocationPayload) => {
  const locationIndex = state.locations.findIndex(({ id }: LocationProps) => id === location.id);
  state.locations[locationIndex] = location;
}

export const setWinner = (state: GameState, { payload: { winner } }: SetGameWinnerPayload) => {
  state.winner = winner;
}

export const setGame = (state: GameState, { payload: { game } }: SetGamePayload) => {
  state.id = game.id
  state.turn = game.turn
  state.maxTurns = game.maxTurns
  state.locations = game.locations
  state.timer = game.timer;
}


export const setTimer = (state: GameState, { payload: { timer } }: SetTimerPayload) => {
  state.timer = timer;
}
