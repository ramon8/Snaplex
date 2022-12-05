import { LocationProps } from "@components";
import { RootState } from "@store";
import { GameState, SetLocations } from "@store/slices/game/gameSlice.interface";
import { PlayerState, SetPlayer } from "@store/slices/player/playerSlice.interface";
import { Game, Location, Player } from "@types";
import { SetGame } from "@store/slices/game/gameSlice.interface";
import { START_GAME_RESPONSE } from "@types";
import { gameActions } from "@store/slices";

export const adaptGame = ({ id: userId, game: { id, maxTurns, name, playerA, playerB, turn } }: START_GAME_RESPONSE): SetGame => ({
    game: {
        locations: [],
        player: userId,
        id: id,
        maxTurns: maxTurns,
        oponent: '',
        turn: turn,
    },
})

export const adaptLocation = ({ id, name, playerACards, playerAPower, playerBCards, playerBPower, description }: Location): LocationProps => ({
    id,
    name,
    playerCards: playerACards,
    oponentCards: playerBCards,
    playerPower: playerAPower,
    oponentPower: playerBPower,
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
    return locations.map(({ id, name, oponentCards, oponentPower, playerCards, playerPower }: LocationProps) => ({
        id,
        name,
        playerACards: playerCards,
        playerAPower: playerPower,
        playerBCards: [],
        playerBPower: 0,
    }));
}

export const adaptNextTurn = ({ game }: RootState) => {
    console.log({ game });
    const locations: Location[] = adaptLocationProps(game.locations)
    return { roomId: game.id, locations: locations }
}