import { Card, GameRoom } from '@types';

export const findRoom = (gameRooms: GameRoom[], roomId: string): number =>
  gameRooms.findIndex(gameRoom => gameRoom.id === roomId)

export const findUser = ({ player, oponent }: GameRoom, userId: string): number =>
  [player, oponent].findIndex(user => user.id === userId)

export const findSite = (gameRoom: GameRoom, locationId: string): number =>
  gameRoom.game.sites.findIndex(location => location.id === locationId)

export const shuffleDeck = (deck: Card[]): Card[] =>
  deck.sort(() => Math.random() - 0.5);