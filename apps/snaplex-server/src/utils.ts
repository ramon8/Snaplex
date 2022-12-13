import { Card, GameRoom } from '@types';
import { randomInt } from 'crypto';

export const findRoom = (gameRooms: GameRoom[], roomId: string): number =>
  gameRooms.findIndex(gameRoom => gameRoom.id === roomId)

export const findUser = ({ player, oponent }: GameRoom, userId: string): number =>
  [player, oponent].findIndex(user => user.id === userId)

export const findSite = (gameRoom: GameRoom, locationId: string): number =>
  gameRoom.game.sites.findIndex(location => location.id === locationId)

export const shuffleDeck = (array: any[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
}

export const setRandomPowerToCard = (card: Card): Card => ({
  ...card,
  power: randomInt(6)
})

export const setRandomPowerToDeck = (deck: Card[]): Card[] => deck.map(card => ({ ...setRandomPowerToCard(card) }));