import { LocationProps } from "@components";
import { RootState } from "@store";
import { Location } from '@types';

export const adaptLocations = (locations: Location[]): LocationProps[] => locations.map(({ id,
  name, playersCards, playersPower, description }) => ({
    id,
    name,
    playerCards: playersCards[0],
    playerPower: playersPower[0],
    oponentCards: playersCards[1],
    oponentPower: playersPower[1],
    description
  }))
