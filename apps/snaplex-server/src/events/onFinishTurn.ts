import { Action, Card, User } from "@types";
import { setGameRoom, setUserTurnActions } from "../features/gameRooms/gameRooms";
import { GameRoom } from "../interfaces/gameRoom";
import { store } from "../store";
import { findRoom } from "../utils";
import { emitNextTurn } from "./emitNextTurn";

export const onFinishTurn = (roomId: string, socket: any, userId: string) => (actions: Action[]) => {
  const { gameRooms } = store.getState();
  const gameRoomIndex = findRoom(gameRooms, roomId)
  const gameRoom = gameRooms[gameRoomIndex]

  const userWithActions = gameRoom.users.find(({ turnActions }) => turnActions)
  const usersActions: Action[][] = [[], []]

  store.dispatch(setUserTurnActions({ userId, roomId: gameRoom.id, turnActions: actions }));

  if (userWithActions) {
    clearTimeout(gameRooms[gameRoomIndex].timeOut);
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

export const setNewState = (gameRoom: GameRoom, actions: Action[][]) => {
  console.log({ actions });
  const { gameRooms } = store.getState();
  const indexGameRoom = findRoom(gameRooms, gameRoom.id)
  const locations = gameRooms[indexGameRoom].game.locations;

  const updatedUsers: User[] = []

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
    const newCardsIds = newLocations.map(location => location.playersCards[userIndex]).flat().map(card => card.id);

    const newDeck = [...deck]
    const newCard = newDeck.pop();
    const newHand = hand.filter(card => !newCardsIds.includes(card.id));
    newCard && newHand.push(newCard);
    updatedUsers.push({
      ...user,
      deck: newDeck,
      hand: newHand,
      mana: newTurn,
      turnActions: undefined,
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

  // check if is the last turn
  if(updatedgameRoom.game.turn > updatedgameRoom.game.maxTurns){
    let player1WinLocations = 0;
    let player2WinLocations = 0;
    
    // check how many locations wins every player
    updatedgameRoom.game.locations.forEach(location => {
      if(location.playersPower[0] > location.playersPower[1]) player1WinLocations = player1WinLocations + 1;
      if(location.playersPower[1] > location.playersPower[0]) player2WinLocations = player2WinLocations + 1;
    } )

    // check if any player won directly
    if(player1WinLocations >= 2 || player2WinLocations >= 2){
      const winner = player1WinLocations > player2WinLocations ? gameRoom.users[0].id : gameRoom.users[1].id;
      emitNextTurn(updatedgameRoom, winner);
    } else {
      let player1TotalPower = 0;
      let player2TotalPower = 0;

      // calculate total power of players
      updatedgameRoom.game.locations.forEach(location => {
        player1TotalPower = player1TotalPower + location.playersPower[0];
        player2TotalPower = player2TotalPower + location.playersPower[1];
      });

      let winner;
      if(player1TotalPower === player2TotalPower) winner = null;
      if(winner !== null) winner = player1WinLocations > player2WinLocations ? gameRoom.users[0].id : gameRoom.users[1].id;
      emitNextTurn(updatedgameRoom, winner); // utilizar el mismo emitNextTurn y si pasamos prop winner cambiar code en vez de replicar code?
    };

    //close socket
  } else{
    emitNextTurn(updatedgameRoom);
  }
}