import { Action, Card, EmitNextTurnPayload, Location } from "@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameRoom } from "../features/gameRooms/gameRoom.interfaces";
import { findUser } from "../utils";

export const emitNextTurn = (gameRoom: GameRoom, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, actions: Record<string, Action[]>) => {
  const userId = socket.handshake.query['id'] as string;
  const { deck, hand, id, mana } = gameRoom.users[findUser(gameRoom, userId)]
  const { locations, maxTurns, turn } = gameRoom.game

  let newLocations: Location[] = [];
  gameRoom.users.forEach(({ deck, hand, id, mana, name, ...user }, userIndex) => {
    const userPlay = actions[id];
    user.turnActions = [];


    locations.forEach((location) => {
      const cardsToAdd = userPlay.filter((action) => action.id === location.id).map(action => action.card);
      const playersCards = [];
      playersCards[userIndex] = cardsToAdd;
      let newLocation: Location = {
        ...location,
        playersCards: playersCards,
      }
      newLocations.push(newLocation);
    });
    // console.log(newLocations)

    // const localHand = [...hand];
    // const newLocations = [...locations]
    // userPlay.forEach(({ card, id }: Action, i) => {
    //   const locationIndex = newLocations.findIndex(location => location.id === id);
    //   // newLocations[locationIndex].playersCards[0] = [...newLocations[locationIndex].playersCards[0], card]

    //   const cardIndex = hand.findIndex(({ id }) => card.id === id)
    //   localHand.splice(cardIndex, 1);
    // });

    // console.log(localHand);

    const data: EmitNextTurnPayload = {
      deck,
      hand: [],
      locations,
      mana: mana + 1,
      turn: turn + 1,
      maxTurns,
      userId: id,
    }

  })


  // user.socket.emit("NEXT_TURN", data);

  console.log(newLocations)
}
