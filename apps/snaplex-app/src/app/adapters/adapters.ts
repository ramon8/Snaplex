import { LocationProps } from "@components";
import { RootState } from "@store";
import { GameState, SetLocations } from "@store/slices/game/gameSlice.interface";
import { PlayerState, SetPlayer } from "@store/slices/player/playerSlice.interface";
import { Game, Location, Player } from "@types";
import { SetGame } from "@store/slices/game/gameSlice.interface";
import { gameActions } from "@store/slices";

export const adaptGame = ({ id: userId, game: { id, maxTurns, name, playerA, playerB, turn } }: any): SetGame => ({
    game: {
        locations: [],
        player: userId,
        id: id,
        maxTurns: maxTurns,
        oponent: '',
        turn: turn,
    },
})

export const adaptLocation = ({ id, name, playersCards, playersPower, description }: Location): LocationProps => ({
    id,
    name,
    playerCards: playersCards[0],
    oponentCards: playersCards[1],
    playerPower: playersPower[0],
    oponentPower: playersPower[1],
    description
})


export const adaptLocations = (locations: Location[]): SetLocations => ({ locations: locations.map(adaptLocation) })

export const adaptPlayer = ({ id, name, deck, hand, mana }: Player): SetPlayer => ({
    player: {
        id,
        deck,
        hand,
        mana
    }
})

export const adaptState = ({ game: { id, locations, maxTurns, oponent, player, turn }, player: { deck, hand, id: playerId, mana, } }: RootState): GameState => ({
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

export const adaptNextTurn = ({ game }: RootState) => {
    console.log({ game });
    const locations: Location[] = adaptLocationProps(game.locations)
    return { roomId: game.id, locations: locations }
}