import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decks } from '../../db/cards'
import { locationsMock } from '../../db/locations'
import { emitReconnect } from '../../events/emitReconnectGame'
import { emitStartGame } from '../../events/emitStartGame'
import { onFinishTurn } from '../../events/onFinishTurn'
import { findLocation, findRoom, findUser } from '../../utils'
import { GameRoom, JoinGameRoomPayload, SetLocationsPayload, SetMaxTurnPayload, SetUserPayload, SetPlayersCardsInLocationPayload, SetTurnPayload, SetUserHandPayload, SetUserDeckPayload, SetUserIsWaitingPayload, SetUserManaPayload, UpdateUserSocketPayload, SetGamePayload, SetGameRoomPayload } from './gameRoom.interfaces'

export type GameRoomState = GameRoom[]

const initialState: GameRoomState = []

const gameRoomsSlice = createSlice({
  name: 'gameRoom',
  initialState: initialState,
  reducers: {
    addGameRoom(state, { payload }: PayloadAction<GameRoom>) {
      state.push(payload)
    },

    joinGameRoom(state, { payload: { roomId, user } }: PayloadAction<JoinGameRoomPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId);
      state[roomIndex].users.push(user);

      // Initialize players states
      state[roomIndex].users.forEach(({ id, socket }, i) => {
        const deck = [...decks[i]]
        const hand = deck.splice(deck.length - 3, 3)

        state[roomIndex].users[i].deck = deck;
        state[roomIndex].users[i].hand = hand;
        state[roomIndex].users[i].mana = 1;
        state[roomIndex].users[i].id = id;

        state[roomIndex].game.turn = 1;
        state[roomIndex].game.maxTurns = 6;
        state[roomIndex].game.locations = locationsMock;
        //socket.on("FINISH_TURN", onFinishTurn(state[roomIndex] as GameRoom, socket, id))
      });

      emitStartGame(state[roomIndex] as GameRoom)
    },

    setUserSocket(state, { payload: { socket, userId, roomIndex } }: PayloadAction<UpdateUserSocketPayload>) {
      const userIndex = findUser(state[roomIndex] as GameRoom, userId)
      state[roomIndex].users[userIndex].socket = socket
      emitReconnect(state as GameRoom[], state[roomIndex] as GameRoom, socket)
    },

    setUserHand(state, { payload: { hand, roomId, userId } }: PayloadAction<SetUserHandPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      const userIndex = findUser(state[roomIndex] as GameRoom, userId)
      state[roomIndex].users[userIndex].hand = hand
    },

    setUserTurnActions(state, { payload: { roomId, userId, turnActions } }: PayloadAction<SetUserIsWaitingPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      const userIndex = findUser(state[roomIndex] as GameRoom, userId)
      state[roomIndex].users[userIndex].turnActions = turnActions
    },

    setUserDeck(state, { payload: { roomId, userId, deck } }: PayloadAction<SetUserDeckPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      const userIndex = findUser(state[roomIndex] as GameRoom, userId)
      state[roomIndex].users[userIndex].deck = deck
    },

    setUserMana(state, { payload: { roomId, userId, mana } }: PayloadAction<SetUserManaPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      const userIndex = findUser(state[roomIndex] as GameRoom, userId)
      state[roomIndex].users[userIndex].mana = mana
    },

    setTurn(state, { payload: { roomId, turn } }: PayloadAction<SetTurnPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game.turn = turn
    },

    setMaxTurn(state, { payload: { roomId, maxTurns } }: PayloadAction<SetMaxTurnPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game.maxTurns = maxTurns
    },

    setLocations(state, { payload: { roomId, locations } }: PayloadAction<SetLocationsPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game.locations = locations
    },

    setUser(state, { payload: { roomId, user } }: PayloadAction<SetUserPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      const userIndex = findUser(state[roomIndex] as GameRoom, user.id)
      state[roomIndex].users[userIndex] = user;
    },

    setGame(state, { payload: { roomId, game } }: PayloadAction<SetGamePayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      state[roomIndex].game = game;
    },

    setPlayersCardsInLocation(state, { payload: { roomId, locationId, playersCards } }: PayloadAction<SetPlayersCardsInLocationPayload>) {
      const roomIndex = findRoom(state as GameRoom[], roomId)
      const locationIndex = findLocation(state[roomIndex] as GameRoom, locationId)
      state[roomIndex].game.locations[locationIndex].playersCards = playersCards;
    },

    setGameRoom(state, { payload: { gameRoom } }: PayloadAction<SetGameRoomPayload>) {
      const roomIndex = findRoom(state as GameRoom[], gameRoom.id)
      state[roomIndex] = gameRoom;
    }
  }
})

export const { addGameRoom, joinGameRoom, setGameRoom, setGame, setUserSocket, setUserHand, setUserTurnActions, setUser, setUserDeck, setMaxTurn, setTurn, setUserMana, setLocations, setPlayersCardsInLocation } = gameRoomsSlice.actions
export default gameRoomsSlice.reducer
