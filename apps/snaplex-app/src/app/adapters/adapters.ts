import { LocationProps } from "@components";
import { RootState } from "@store";
import { GameState, SetLocations } from "@store/slices/game/gameSlice.interface";
import { PlayerState, SetPlayer } from "@store/slices/player/playerSlice.interface";
import { FINISH_TURN_PAYLOAD, Game, Location, NEXT_TURN_PAYLOAD, Player, START_GAME_PAYLOAD } from "@types";
import { SetGame } from "@store/slices/game/gameSlice.interface";
import { gameActions } from "@store/slices";

export const adaptGame = ({ id, deck, hand, locations, mana }: START_GAME_PAYLOAD): SetGame => ({
    game: {
        locations: locations,
        player: id,
        maxTurns: 6,
        turn: mana,

        id: '',
        oponent: '',
    },
})

export const adaptLocation = ({ id, name, playersCards, playersPower, description }: Location): LocationProps => ({
    id,
    name,
    playersCards,
    playersPower,
    description
})


export const adaptLocations = (locations: Location[]): SetLocations => ({ locations: locations.map(adaptLocation) })

export const adaptPlayer = ({ id, deck, hand, mana }: START_GAME_PAYLOAD): SetPlayer => ({
    player: {
        id,
        deck,
        hand,
        mana
    }
})

export const adaptState = ({ game: { id, locations, maxTurns, oponent, player, turn } }: RootState): GameState => ({
    id,
    locations,
    maxTurns,
    oponent,
    player,
    turn
})

export const adaptLocationProps = (locations: LocationProps[]): Location[] => {
    return []
}

export const adaptNextTurn = ({ game }: RootState): FINISH_TURN_PAYLOAD => {
    console.log({ game })
    return {
        playersCards: game.locations.map(location => location.playersCards[0]),
        userId: game.player
    }
}