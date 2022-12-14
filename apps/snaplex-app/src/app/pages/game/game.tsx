import { Footer, Header, Main } from "@components";
import { RootState } from "@store";
import { gameActions, playerActions } from "@store/slices";
import { EmitData } from "@types";
import { socket } from 'apps/snaplex-app/src/main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GameProps } from "./game.interface";
import { ContainerGame } from "./game.styles";

export const Game = (props: GameProps) => {

  const { player, game } = useSelector((state: RootState) => state)

  const dispatch = useDispatch();

  const onConnect = (data: EmitData) => {
    const { deck, hand, sites, mana, maxTurns, turn, userId: id, turnStartedAt, maxTurnTime } = data;
    console.log({ data })

    dispatch(playerActions.setPlayer({
      player: {
        ...player,
        deck, hand, id, mana,
      }
    }));

    dispatch(gameActions.setGame({
      game: {
        ...game,
        sites,
        maxTurns,
        turn,
        turnStartedAt,
        maxTurnTime
      },
    }));
  }

  const onFinish = (data: any) => {
    onConnect(data)
    console.log("winnerId of the game is", data.winner)
    dispatch(gameActions.setGame({ game: { ...game, winner: data.winner } }))
  }

  useEffect(() => {
    socket.on("START_GAME", onConnect)
    socket.on("RECONNECT", onConnect)
    socket.on("NEXT_TURN", onConnect)
    socket.on("FINISH_GAME", onFinish);
  }, []);

  return <ContainerGame {...props}>
    <Header />
    <Main />
    <Footer />
  </ContainerGame >
}
