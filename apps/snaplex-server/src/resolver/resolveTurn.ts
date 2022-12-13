import { Card } from "@types";
import { emitGameData } from "../emiters/emitData";
import { setGame, setPlayer } from "../features/gameRooms/gameRooms";
import { store } from "../store";
import { findRoom } from "../utils";

export const resolveTurn = (roomId: string) => {
  let { gameRooms } = store.getState();
  let gameRoom = gameRooms[findRoom(gameRooms, roomId)];

  const sites = [...gameRoom.game.sites]

  /**
   * Add each card in its corresponding location
   * Update power value
   */
  type playerKeyType = 'player' | 'oponent';
  const playerKeys: playerKeyType[] = ['player', 'oponent']

  playerKeys.forEach(key => {
    gameRoom[key].actions.forEach(action => {
      const siteIndex = sites.findIndex(site => site.id === action.locationId)
      sites[siteIndex] = {
        ...sites[siteIndex],
        [`${key}Cards`]: [...sites[siteIndex][`${key}Cards`], action.card],
        // [`${key}Power`]: sites[siteIndex][`${key}Cards`].reduce((power, card) => power + card.power, 0),
      }
    })
    sites.forEach((site, i) => {
      sites[i] = {
        ...site,
        [`${key}Power`]: site[`${key}Cards`].reduce((power, card) => power + card.power, 0),
      }
    });
  })

  store.dispatch(setGame({
    game: {
      ...gameRoom.game,
      sites,
      turnStartedAt: new Date().getTime(),
      turn: gameRoom.game.turn + 1,
    }, roomId
  }))


  playerKeys.forEach(key => {
    const player = { ...gameRoom[key] };
    const cardsToRemove = sites.map(site => site[`${key}Cards`]).flat().map(card => card.id);
    const deck: Card[] = [...player.deck];
    const hand: Card[] = [...player.hand.filter(card => !cardsToRemove.includes(card.id))];
    if (player.hand.length < 7) {
      const drawedCard: Card = deck.pop() as Card;
      drawedCard && hand.push(drawedCard);
    }

    store.dispatch(setPlayer({
      player: {
        ...player,
        deck,
        hand,
        actions: [],
        turnFinished: false,
        power: sites.reduce((totalPower, site) => totalPower + site[`${key}Cards`].reduce((power, card) => power + card.power, 0), 0),
        mana: gameRoom.game.turn + 1
      },
      roomId
    }))
  })


  gameRooms = store.getState().gameRooms;
  gameRoom = gameRooms[findRoom(gameRooms, roomId)];

  emitGameData(gameRoom);
}
