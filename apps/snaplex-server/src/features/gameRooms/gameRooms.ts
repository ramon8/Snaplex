import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decks } from '../../db/cards'
import { sitesMock } from '../../db/locations'
import { emitReconnect } from '../../events/emitReconnectGame'
import { emitStartGame } from '../../events/emitStartGame'
import { findSite, findRoom, findUser, shuffleDeck } from '../../utils'
import { JoinGameRoomPayload, SetGamePayload, SetGameRoomPayload, SetLocationsPayload, SetMaxTurnPayload, setPlayerPayload, SetPlayersCardsInLocationPayload, SetTimerPayload, SetTurnPayload, SetUserDeckPayload, SetUserHandPayload, SetUserIsWaitingPayload, SetUserManaPayload, UpdateUserSocketPayload } from './gameRoom.interfaces'
import { Card, GameRoom, Player, User } from '@types'
import { emitGameData } from '../../emiters/emitData'

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

      emitGameData(state[roomIndex] as GameRoom)
    },

    setUserSocket(state, { payload: { socket, roomIndex } }: PayloadAction<UpdateUserSocketPayload>) {
      const id = socket.handshake.query["id"] as string;

      const { player } = state[roomIndex];
      if (id === player.id) state[roomIndex].player.socket = socket;
      state[roomIndex].oponent.socket = socket;

      emitReconnect(state as GameRoom[], state[roomIndex] as GameRoom, socket)
    },

    setUserHand(state, { payload: { hand, roomId, userId } }: PayloadAction<SetUserHandPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player } = state[roomIndex];
      if (userId === player.id) state[roomIndex].player.hand = hand;
      state[roomIndex].oponent.hand = hand;
    },

    setUserDeck(state, { payload: { roomId, userId, deck } }: PayloadAction<SetUserDeckPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player } = state[roomIndex];
      if (userId === player.id) state[roomIndex].player.deck = deck;
      state[roomIndex].oponent.deck = deck;
    },

    setUserMana(state, { payload: { roomId, userId, mana } }: PayloadAction<SetUserManaPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)

      const { player } = state[roomIndex];
      if (userId === player.id) state[roomIndex].player.mana = mana;
      state[roomIndex].oponent.mana = mana;
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
      state[roomIndex].oponent = player;
    },

    setGame(state, { payload: { roomId, game } }: PayloadAction<SetGamePayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game = game;
    },

    setGameRoom(state, { payload: { gameRoom } }: PayloadAction<SetGameRoomPayload>) {
      const roomIndex = findRoom(state as GameRoom[], gameRoom.id)
      state[roomIndex] = gameRoom;
    },
  }
})

export const { addGameRoom, joinGameRoom, setGameRoom, setGame, setUserSocket, setUserHand, setPlayer, setUserDeck, setMaxTurn, setTurn, setUserMana, setSites } = gameRoomsSlice.actions
export default gameRoomsSlice.reducer
