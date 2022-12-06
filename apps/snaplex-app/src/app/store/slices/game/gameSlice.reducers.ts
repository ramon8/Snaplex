import { GameState, SetGamePayload, SetIdPayload, SetLocationPayload, SetLocationsPayload, SetMaxTurnsPayload, SetTurnPayload } from './gameSlice.interface'
import { LocationProps } from '@components/location'

export const setId = (state: GameState, { payload: { id } }: SetIdPayload) => { state.id = id }
export const setMaxTurns = (state: GameState, { payload: { value } }: SetMaxTurnsPayload) => { state.maxTurns = value }
export const setTurn = (state: GameState, { payload: { value } }: SetTurnPayload) => { state.turn = value }

export const setLocations = (state: GameState, { payload: { locations } }: SetLocationsPayload) => { state.locations = locations }

export const setLocation = (state: GameState, { payload: { location } }: SetLocationPayload) => {
    const locationIndex = state.locations.findIndex(({ id }: LocationProps) => id === location.id);
    state.locations[locationIndex] = location;
}

export const setGame = (state: GameState, { payload: { game } }: SetGamePayload) => {
    state.id = game.id
    state.turn = game.turn
    state.maxTurns = game.maxTurns

    state.locations = game.locations
    state.player = game.player
    state.oponent = game.oponent
}