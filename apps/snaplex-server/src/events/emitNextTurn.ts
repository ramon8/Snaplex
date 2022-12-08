import { Action, Card, EmitNextTurnPayload, Location } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { setGame, setLocations, setUser, setUserDeck, setUserHand } from "../features/gameRooms/gameRooms";
import { store } from "../store";
import { findLocation, findRoom, findUser } from "../utils";

export const emitNextTurn = (gameRoom: GameRoom, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, actions: Action[][]) => {
  console.log({ actions });
  const { gameRooms } = store.getState();
  const indexGameRoom = findRoom(gameRooms, gameRoom.id)
  const locations = gameRooms[indexGameRoom].game.locations;

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

  store.dispatch(setGame({
    game: {
      ...gameRooms[indexGameRoom].game,
      turn: newTurn,
      locations: newLocations,
    },
    roomId: gameRooms[indexGameRoom].id
  }));

  const { gameRooms: newGameRooms } = store.getState();
  const newIndexGameRoom = findRoom(newGameRooms, gameRoom.id)

  const loc = newGameRooms[newIndexGameRoom].game.locations;
  newGameRooms[newIndexGameRoom].users.forEach(({ hand, deck, ...user }, userIndex) => {
    // const newCardsIds = newLocations.map(location => location.playersCards[userIndex].map(cards => cards.id))
    const newCardsIds = loc.map(location => location.playersCards)[userIndex].flat().map(card => card.id);

    const newDeck = [...deck]
    const newCard = newDeck.pop();
    const newHand = hand.filter(card => !newCardsIds.includes(card.id));
    newCard && newHand.push(newCard);
    store.dispatch(setUser({
      user: {
        ...user,
        deck: newDeck,
        hand: newHand,
        mana: newTurn,
      },
      roomId: gameRooms[indexGameRoom].id
    }))
  })
}




































  // const userId = socket.handshake.query['id'] as string; console.log();
  // const { deck, hand, id, mana } = gameRoom.users[findUser(gameRoom, userId)]
  // const { maxTurns, turn, ...game } = gameRoom.game
  // // console.log(actions);

  // let newLocations: Location[] = [];

  // gameRoom.users.forEach(({ deck, hand, id, mana, name, ...user }, userIndex) => {
  //   game.locations.forEach(({ id: locationId, name, playersCards, playersPower, description }) => {
  //     const newPlayersCards = [[...playersCards[0]], [...playersCards[1]]];
  //     const actionCards = actions[id].filter(action => action.id === locationId).map(action => action.card)
  //     console.log({ actionCards })
  //     newPlayersCards[userIndex].push(...actionCards)
  //     newLocations.push({
  //       id, name, playersCards: newPlayersCards, playersPower, description
  //     })
  //   });

  //   // locations[userIndex].playersCards[0].push(...actions[id].map(action => action.card))

  // })
  // store.dispatch(setLocations({ locations: newLocations, roomId: gameRoom.id }));

  // user.socket.emit("NEXT_TURN", data);