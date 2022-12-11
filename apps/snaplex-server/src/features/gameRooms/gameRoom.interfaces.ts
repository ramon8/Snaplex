import { User, Game, Card, Action, Player, Site, GameRoom } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


export interface JoinGameRoomPayload {
  roomId: string,
  oponent: Player,
}

export interface UpdateUserSocketPayload {
  roomIndex: number,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
}

export interface SetUserDeckPayload {
  roomId: string;
  userId: string;
  deck: Card[];
}

export interface SetUserIsWaitingPayload {
  roomId: string;
  userId: string;
  turnActions: Action[];
}

export interface SetUserManaPayload {
  roomId: string;
  userId: string;
  mana: number;
}


export interface SetUserHandPayload {
  roomId: string;
  userId: string;
  hand: Card[];
}

export interface SetTurnPayload {
  roomId: string;
  turn: number;
}

export interface SetMaxTurnPayload {
  roomId: string;
  maxTurns: number;
}

export interface SetLocationsPayload {
  roomId: string;
  sites: Site[];
}


export interface setPlayerPayload {
  roomId: string;
  player: Player;
}


export interface SetGamePayload {
  roomId: string;
  game: Game;
}


export interface SetPlayersCardsInLocationPayload {
  roomId: string;
  locationId: string;
  playersCards: Card[][]
}

export interface SetTimerPayload {
  roomId: string;
  timeOut: NodeJS.Timeout;
}



export interface SetGameRoomPayload {
  gameRoom: GameRoom;
}
