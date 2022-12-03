import { LocationProps } from "@components";
import { RootState } from "@store";
import { GameState } from "@store/slices/game/gameSlice.interface";
import { PlayerState } from "@store/slices/player/playerSlice.interface";
import { Game, Location, Player } from "@types";

export const adaptGame = ({ id, locations, maxTurns, name, playerA, playerB, turn }: Game): GameState => ({
    id,
    locations: locations?.map((location: Location) => adaptLocation(location)),
    maxTurns,
    oponent: playerB?.id,
    player: playerA?.id,
    turn
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

export const adaptPlayer = ({ id, name, deck, hand, mana }: Player): PlayerState => ({
    id,
    deck,
    hand,
    mana
})

export const adaptState = ({ game: { id, locations, maxTurns, oponent, player, turn }, player: { deck, hand, id: playerId, mana, } }: RootState): GameState => ({
    id,
    locations,
    maxTurns,
    oponent,
    player,
    turn
})