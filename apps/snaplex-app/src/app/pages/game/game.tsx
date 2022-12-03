import { useEffect } from 'react';
import { Footer, Header, Main } from "@components"
import { GameProps } from "./game.interface"
import { ContainerGame } from "./game.styles"
import { socket } from 'apps/snaplex-app/src/main';
import { EMIT, Game as GameInterface } from '@types';
import { useDispatch } from 'react-redux';
import { gameActions, playerActions } from '@store/slices';
import { adaptGame, adaptPlayer } from '../../adapters/adapters';

export const Game = (props: GameProps) => {

    const dispatch = useDispatch();

    const onConnect = (game: GameInterface) => {
        dispatch(playerActions.setPlayer({ player: adaptPlayer(game.playerA) }));
        dispatch(gameActions.setGame({ game: adaptGame(game) }));
    }


    useEffect(() => {
        socket.on("SOCKET_NEW", (id: any) => {
            localStorage.setItem('id', id)
        })

        socket.on("NEW_GAME", onConnect)
        socket.on("RECONNECT", onConnect)
    }, []);

    return <ContainerGame {...props}>
        <Header />
        <Main />
        <Footer />
    </ContainerGame >
}