import { Player } from "@types";

const initialPlayer: Player = {
    actions: [],
    deck: [],
    hand: [],
    id: '',
    mana: 0,
    power: 0,
    turnFinished: false,
}

export const createPlayer = (player?: Partial<Player>): Player => ({ ...initialPlayer, ...player })