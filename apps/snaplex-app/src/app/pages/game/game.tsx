import { Footer, Header, Main } from "@components";
import { RootState } from '@store';
import { gameActions, playerActions } from '@store/slices';
import { NEXT_TURN_PAYLOAD, START_GAME_PAYLOAD } from '@types';
import { socket } from 'apps/snaplex-app/src/main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adaptGame, adaptLocations, adaptPlayer } from '../../adapters/adapters';
import { GameProps } from "./game.interface";
import { ContainerGame } from "./game.styles";



export const Game = (props: GameProps) => {

    const dispatch = useDispatch();

    const hand = useSelector((state: RootState) => state.player.hand);
    const locations = useSelector((state: RootState) => state.game.locations);

    useEffect(() => {
        const connect = (response: START_GAME_PAYLOAD) => {
            console.log('START_GAME', { response });
            dispatch(gameActions.setGame(adaptGame(response)))
            dispatch(playerActions.setPlayer(adaptPlayer(response)))
            dispatch(gameActions.setLocations(adaptLocations(response.locations)))
        }

        socket.on("START_GAME", connect)
        socket.on("RECONNECT", connect)
        socket.on("NEXT_TURN", (data: NEXT_TURN_PAYLOAD) => {
            const { locations, hand, mana, turn } = data;
            console.log({ data });
            dispatch(playerActions.setHand({ hand }))
            dispatch(gameActions.setLocations({ locations: adaptLocations(locations).locations }))
            dispatch(playerActions.setMana({ mana }))
            dispatch(gameActions.setTurn({ value: turn }))
        })
    }, []);

    return <ContainerGame {...props}>
        <Header />
        <Main />
        <Footer />
    </ContainerGame >
}