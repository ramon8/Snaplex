import { Action, Card, User } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { setGameRoom, setLocations, setPlayersCardsInLocation, setUserTurnActions } from "../features/gameRooms/gameRooms";
import { GameRoom } from "../interfaces/gameRoom";
import { store } from "../store";
import { findRoom } from "../utils";
import { emitNextTurn } from "./emitNextTurn";

export const onFinishTurn = (roomId: string, socket: any, userId: string) => (actions: Action[]) => {
  console.log({ actions })

  // const newPlayersCards

  // gameRoom.game.locations.forEach(locations => {
  //   store.dispatch(setPlayersCardsInLocation({ locationId: locations.id, playersCards: [], roomId }))
  // });

  const { gameRooms } = store.getState();
  const gameRoomIndex = findRoom(gameRooms, roomId)
  const gameRoom = gameRooms[gameRoomIndex]

  const userWithActions = gameRoom.users.find(({ turnActions }) => turnActions && turnActions?.length > 0)
  const usersActions: Action[][] = [[], []]

  store.dispatch(setUserTurnActions({ userId, roomId: gameRoom.id, turnActions: actions }));

  if (userWithActions) {

    const { gameRooms: newGamesRooms } = store.getState();
    const newGameRoomIndex = findRoom(newGamesRooms, roomId)
    const newGameRoom = newGamesRooms[newGameRoomIndex]

    newGameRoom.users.forEach((user, index) => {
      usersActions[index].push(...user.turnActions as Action[]);
      store.dispatch(setUserTurnActions({ userId, roomId: newGameRoom.id, turnActions: [] }));
    });

    setNewState(newGameRoom, usersActions);
  }
}

const setNewState = (gameRoom: GameRoom, actions: Action[][]) => {
  console.log({ actions });
  const { gameRooms } = store.getState();
  const indexGameRoom = findRoom(gameRooms, gameRoom.id)
  const locations = gameRooms[indexGameRoom].game.locations;

  const updatedUsers: User[] = []

  const newPower = [0, 0];
  const newTurn = gameRooms[indexGameRoom].game.turn + 1;

  const newLocations = [...locations]; // kk
  locations.forEach((location, locationIndex) => {

    let playersCards: Card[][] = [];
    gameRooms[indexGameRoom].users.forEach(({ hand, deck, ...user }, userIndex) => {
      const newPlayerCards = actions[userIndex].filter(action => action.id === location.id).map(action => action.card)
      playersCards[userIndex] = [...location.playersCards[userIndex], ...newPlayerCards];
    })
    newLocations[locationIndex] = {
      ...location,
      playersCards: playersCards,
      playersPower: [
        playersCards[0].reduce((a, b) => a + b.power, 0),
        playersCards[1].reduce((a, b) => a + b.power, 0)
      ],
    }
  })


  gameRooms[indexGameRoom].users.forEach(({ hand, deck, ...user }, userIndex) => {
    // const newCardsIds = newLocations.map(location => location.playersCards[userIndex].map(cards => cards.id))
    const newCardsIds = newLocations.map(location => location.playersCards[userIndex]).flat().map(card => card.id);

    const newDeck =  [...deck]
    const newCard = newDeck.pop();
    const newHand = hand.filter(card => !newCardsIds.includes(card.id));
    newCard && newHand.push(newCard);
    updatedUsers.push({
      ...user,
      deck: newDeck,
      hand: newHand,
      mana: newTurn,
      turnActions: [],
    });
  })

  const updatedgameRoom = {
    game: {
      ...gameRooms[indexGameRoom].game,
      turn: newTurn,
      locations: newLocations,
    },
    id: gameRooms[indexGameRoom].id,
    users: updatedUsers
  }

  store.dispatch(setGameRoom({
    gameRoom: updatedgameRoom
  }));

  emitNextTurn(updatedgameRoom);
}