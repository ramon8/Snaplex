import { Footer, Header, Main } from "@components";
import { gameActions, playerActions } from "@store/slices";
import { actionsActions } from "@store/slices/actions/actionsSlice";
import { EmitReconnectGamePayload, EmitStartGamePayload } from "@types";
import { socket } from 'apps/snaplex-app/src/main';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { adaptLocations } from "../../adapters";
import { GameProps } from "./game.interface";
import { ContainerGame } from "./game.styles";

export const Game = (props: GameProps) => {

  const dispatch = useDispatch();

  const onConnect = (data: EmitStartGamePayload) => {
    const { deck, hand, locations, mana, maxTurns, turn, userId: id } = data;

    dispatch(actionsActions.clearActions());
    dispatch(playerActions.setPlayer({
      player: {
        deck, hand, id, mana,
      }
    }));

    dispatch(gameActions.setGame({
      game: {
        id: '',
        locations: adaptLocations(locations),
        maxTurns,
        turn
      },
      timer: true,
    }));
  }

  useEffect(() => {
    socket.on("START_GAME", onConnect)
    socket.on("RECONNECT", onConnect)
    socket.on("NEXT_TURN", onConnect)
  }, []);

  return <ContainerGame {...props}>
    <Header />
    <Main />
    <Footer />
  </ContainerGame >
}
