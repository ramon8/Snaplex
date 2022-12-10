import { Action, Card, EmitNextTurnPayload, EmitReconnectGamePayload, Location, User } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { setGame, setGameRoom, setLocations, setUser, setUserDeck, setUserHand } from "../features/gameRooms/gameRooms";
import { store } from "../store";
import { findLocation, findRoom, findUser } from "../utils";

export const emitNextTurn = (gameRoom: GameRoom, winnerId?: string | null) => {
  const { gameRooms } = store.getState();
  const gameRoomIndex = findRoom(gameRooms, gameRoom.id);

  let { locations, maxTurns, turn } = gameRooms[gameRoomIndex].game

  const prevLocations: Location[] = []

  locations.forEach((location, i) => {
    prevLocations.push({
      ...location,
      playersCards: [location.playersCards[1], location.playersCards[0]]
    })
    // [locations[i].playersCards[0], locations[i].playersCards[1]] = [locations[i].playersCards[1], locations[i].playersCards[0]]
  })

  gameRooms[gameRoomIndex].users.forEach(({ deck, hand, id, mana, socket }, userindex) => {
    let data: EmitReconnectGamePayload = {
      deck,
      hand,
      locations: locations,
      mana,
      turn,
      maxTurns,
      userId: id,
    }
    if (userindex) {
      data = {
        deck,
        hand,
        locations: prevLocations,
        mana,
        turn,
        maxTurns,
        userId: id,
      }
    }

    if(winnerId){
      data.winner = winnerId;
      socket.emit("FINISH_GAME", data)
    }
    socket.emit("NEXT_TURN", data);
  })

  // const userId = socket.handshake.query['id'] as string;
  // const gameRoomIndex = findRoom(gameRooms, gameRoom.id);

  // const { deck, hand, id, mana } = gameRooms[gameRoomIndex].users[findUser(gameRooms[gameRoomIndex], userId)]
  // const { locations, maxTurns, turn } = gameRooms[gameRoomIndex].game

  // const newLocations = [...locations];

  // newLocations.forEach((_, i) => {
  //   [newLocations[i].playersCards[0], newLocations[i].playersCards[1]] = [locations[i].playersCards[1], locations[i].playersCards[0]]
  // })

  // const userindex = findUser(gameRooms[gameRoomIndex], userId);
  // let data: EmitReconnectGamePayload = {
  //   deck,
  //   hand,
  //   locations: newLocations,
  //   mana,
  //   turn,
  //   maxTurns,
  //   userId: id,
  // }
  // if (userindex) {
  //   data = {
  //     deck,
  //     hand,
  //     locations: locations,
  //     mana,
  //     turn,
  //     maxTurns,
  //     userId: id,
  //   }
  // }


  // console.log({ data });
  // socket.emit("RECONNECT", data);
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