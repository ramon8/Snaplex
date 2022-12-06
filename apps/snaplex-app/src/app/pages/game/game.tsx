import { useEffect } from 'react';
import { Footer, Header, Main } from "@components"
import { GameProps } from "./game.interface"
import { ContainerGame } from "./game.styles"
import { socket } from 'apps/snaplex-app/src/main';
import { Game as GameInterface, Player, START_GAME_PAYLOAD } from '@types';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions, playerActions } from '@store/slices';
import { adaptGame, adaptLocation, adaptLocationProps, adaptLocations, adaptPlayer } from '../../adapters/adapters';
import { io } from 'socket.io-client';
import { RootState } from '@store';


const connect = (response: START_GAME_PAYLOAD) => {
    console.log('START_GAME', { response });
}

export const Game = (props: GameProps) => {

    const dispatch = useDispatch();

    const hand = useSelector((state: RootState) => state.player.hand);
    const locations = useSelector((state: RootState) => state.game.locations);

    useEffect(() => {

        //     let player = response.game.playerB as Player;

        //     if (response.game.playerA.id === response.id)
        //         player = response.game.playerA;

        //     dispatch(gameActions.setGame(adaptGame(response)))
        //     dispatch(playerActions.setPlayer(adaptPlayer(player)))
        //     dispatch(gameActions.setLocations(adaptLocations(response.game.locations)))
        // }

        socket.on("START_GAME", connect)
        socket.on("RECONNECT", connect)
        // socket.on("NEXT_TURN", (data) => {
        //     const { locations, mana, card } = data;
        //     console.log(data);
        //     dispatch(playerActions.setHand({ hand: [...hand, card] }))
        //     dispatch(gameActions.setLocations({ locations: adaptLocations(locations).locations }))
        //     dispatch(playerActions.setMana({ mana }))
        // })
    }, []);

    return <ContainerGame {...props}>
        <Header />
        <Main />
        <Footer />
    </ContainerGame >
}