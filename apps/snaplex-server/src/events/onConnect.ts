import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { initialGame, initialGameRoom } from "../features/gameRooms/gameRoom.mocks";
import { addGameRoom, joinGameRoom, setUserSocket } from "../features/gameRooms/gameRooms";
import { startNewTimer } from "../service/timeOutService";
import { store } from "../store";
import { onFinishTurn } from "./onFinishTurn";
import { joinGame, newGame, reconnecGame } from './../service/Connection.service'

export const onConnect = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const userId = socket.handshake.query['id'] as string;
  const { gameRooms } = store.getState();
  console.log(`[${userId}] connected`)

  const isUserInRoomAlready = gameRooms?.findIndex(({ player, oponent }) =>
    [player, oponent].map(({ id }) => id).includes(userId))

  if (isUserInRoomAlready === -1) { // User not found in any room, try to join waiting room
    console.log(`[${userId}] searching for game`)
    const isAnyRoomWaiting = gameRooms.findIndex(({ isWaiting }) => isWaiting)

    // No rooms are waiting, create new room
    if (isAnyRoomWaiting === -1) newGame(socket)
    else { // Found waiting room, then join that room with the current user
      console.log(`[${userId}] game found, connecting to game ${gameRooms[isAnyRoomWaiting].id}`)
      store.dispatch(joinGameRoom({
        roomId: gameRooms[isAnyRoomWaiting].id,
        user: { id: userId, name: 'test-user', socket, deck: [], hand: [], mana: 1 }
      }))
      startNewTimer(gameRooms[isAnyRoomWaiting], 100000); // 1 min
      socket.on("FINISH_TURN", onFinishTurn(gameRooms[isAnyRoomWaiting].id, socket, userId))

    }
  } else { // Reconnect the user, update socket and initialize listeners
    console.log(`[${userId}] reconnecting`)
    socket.on("FINISH_TURN", onFinishTurn(gameRooms[isUserInRoomAlready].id, socket, userId))
    store.dispatch(setUserSocket({ socket, userId, roomIndex: isUserInRoomAlready }))
  }
}
