import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameRoom } from '@types'
import { decks } from '../../db/cards'
import { sitesMock } from '../../db/locations'
import { emitGameData } from '../../emiters/emitData'
import { emitGameDataToUser } from '../../emiters/emitDataToUser'
import { resolveTurn } from '../../resolver/resolveTurn'
import { findRoom, shuffleDeck } from '../../utils'
import { JoinGameRoomPayload, SetGamePayload, SetGameRoomPayload, SetLocationsPayload, SetMaxTurnPayload, setPlayerPayload, SetTimerPayload, SetTurnPayload, SetUserDeckPayload, SetUserHandPayload, SetUserManaPayload, UpdateUserSocketPayload } from './gameRoom.interfaces'

export type GameRoomState = GameRoom[]

const initialState: GameRoomState = []

const gameRoomsSlice = createSlice({
  name: 'gameRoom',
  initialState: initialState,
  reducers: {
    addGameRoom(state, { payload }: PayloadAction<GameRoom>) { state.push(payload) },

    joinGameRoom(state, { payload: { roomId, oponent } }: PayloadAction<JoinGameRoomPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId);
      const { player } = state[roomIndex];
      state[roomIndex].oponent = oponent;

      [player, oponent].forEach(({ id }, i, users) => {
        const deck = shuffleDeck([...decks[i]])
        const hand = deck.splice(deck.length - 3, 3)

        users[i].deck = deck;
        users[i].hand = hand;
        users[i].mana = 1;
        users[i].id = id;

        state[roomIndex].game.turn = 1;
        state[roomIndex].game.maxTurns = 6;
        state[roomIndex].game.sites = sitesMock;
      });
      state[roomIndex].game.turnStartedAt = new Date().getTime();

      state[roomIndex].timeOut = setTimeOut({
        roomId: roomId, timeOut: setTimeout(() => {
          resolveTurn(roomId);
        }, state[roomIndex].game.maxTurnTime)
      });

      emitGameData(state[roomIndex] as GameRoom)
    },

    setUserSocket(state, { payload: { socket, roomIndex } }: PayloadAction<UpdateUserSocketPayload>) {
      const id = socket.handshake.query["id"] as string;

      const { player } = state[roomIndex];
      if (id === player.id) state[roomIndex].player.socket = socket;
      else state[roomIndex].oponent.socket = socket;

      emitGameDataToUser(state[roomIndex] as GameRoom, id)
    },

    setUserHand(state, { payload: { hand, roomId, userId } }: PayloadAction<SetUserHandPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player } = state[roomIndex];
      if (userId === player.id) state[roomIndex].player.hand = hand;
      else state[roomIndex].oponent.hand = hand;
    },

    setUserDeck(state, { payload: { roomId, userId, deck } }: PayloadAction<SetUserDeckPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player } = state[roomIndex];
      if (userId === player.id) state[roomIndex].player.deck = deck;
      else state[roomIndex].oponent.deck = deck;
    },

    setUserMana(state, { payload: { roomId, userId, mana } }: PayloadAction<SetUserManaPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player } = state[roomIndex];
      if (userId === player.id) state[roomIndex].player.mana = mana;
      else state[roomIndex].oponent.mana = mana;
    },

    setTurn(state, { payload: { roomId, turn } }: PayloadAction<SetTurnPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game.turn = turn
    },

    setMaxTurn(state, { payload: { roomId, maxTurns } }: PayloadAction<SetMaxTurnPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game.maxTurns = maxTurns
    },

    setSites(state, { payload: { roomId, sites } }: PayloadAction<SetLocationsPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game.sites = sites
    },

    setPlayer(state, { payload: { roomId, player } }: PayloadAction<setPlayerPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player: currentPlayer } = state[roomIndex];
      if (player.id === currentPlayer.id) state[roomIndex].player = player;
      else state[roomIndex].oponent = player;
    },

    setGame(state, { payload: { roomId, game } }: PayloadAction<SetGamePayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game = game;
    },

    setGameRoom(state, { payload: { gameRoom } }: PayloadAction<SetGameRoomPayload>) {
      const roomIndex = findRoom(state as GameRoom[], gameRoom.id)
      state[roomIndex] = gameRoom;
    },

    setTimeOut(state, { payload: { timeOut, roomId } }: PayloadAction<SetTimerPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].timeOut = timeOut;
    },
  }
})

export const { addGameRoom, joinGameRoom, setGameRoom, setTimeOut, setGame, setUserSocket, setUserHand, setPlayer, setUserDeck, setMaxTurn, setTurn, setUserMana, setSites } = gameRoomsSlice.actions
export default gameRoomsSlice.reducer
