import { Mana } from "@components/mana";
import { Button } from "@components/button"
import { Hand } from "@components/hand"
import styled, { keyframes } from "styled-components";
import { Deck } from "@components/deck";
import { motion } from "framer-motion";
import { Timer } from "@components/timer";

export const ContainerFooter = styled(motion.div)`
    display: grid;
    place-items: center;
    gap: 32px 8px;
    position: relative;
    &:before{
        content: '';
        position: absolute;
        top: 185px;
        width: 5rem;
        height: 5rem;
        background: #212121;
        rotate: 45deg;
        box-shadow: 0 0 0 4px black;
    }
`

export const ContainerButtonTurn = styled(motion.div)`
    display: grid;
    background: #212121;
    width: 100%;
    box-shadow: 0 0 0 4px black;
    box-sizing: border-box;
    grid-template:
        " mana  " 0px
        " timer " 1rem
        " btn   " ;
    place-items: center;
    
    padding: 16px;
    gap: 1rem;
    z-index: 1;
    &:after{
        content: '';
        z-index: 2;
        position: absolute;
        width: 5rem;
        height: 5rem;
        background: #212121;
        top: 185px;
        left: 174px;
        width: 5rem;
        rotate: 45deg;
    }
`

export const ManaStyled = styled(Mana)`
    top: -2rem;
    z-index: 3;
`

export const ButtonStyled = styled(Button)`
    grid-area: btn;
    height: fit-content;
    z-index: 3;
`

export const HandStyled = styled(Hand)`
    height: 180px;
`

export const DeckStyled = styled(Deck)`
    bottom: 0;
    position: absolute;
    transform: translate(0, 100%);
`

export const TimerStyled = styled(Timer)`
    grid-area: timer;
    z-index: 3;
`