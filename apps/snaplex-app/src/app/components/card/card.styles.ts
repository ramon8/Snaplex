import { motion } from "framer-motion";
import styled from "styled-components";
import { Text } from './../text'
import { CardProps } from "./card.interface";

export const ContainerCard = styled(motion.div)((props: CardProps) => `
    display: grid;
    place-items: center;
    grid-template:
        " mana        power       " auto
        " icon        icon        " 1fr
        " name        name        " auto
        " description description " auto
        / 1fr         1fr;


    padding: .1rem .25rem;
    background: #D6D6D6;
    background-image: url(${props.image});
    background-size: cover;
    border-radius: .5rem;
    border: 2px solid black;

    aspect-ratio: 4 / 6;
    height: auto;
    width: 100%;

    max-width: 70px;
    max-height: 97px;

    font-size: 100%;
    position: relative;

    box-sizing: border-box;
    cursor: grab;
    &:active{
        cursor: grabbing;
    }
`)

export const ContainerCardDetail = styled.div`
    display: grid;
    place-items: center;

    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;

    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.5);
`

export const PowerStyled = styled(Text)`
    grid-area: power;
    font-size: 14px;
    place-self: end;
`

export const Name = styled(Text)`
    grid-area: name;
    text-align: center;
    font-size: 10px;
`

export const ManaValueStyled = styled(Text)`
    place-self: end start;
    font-size: 14px;
    grid-area: mana;
`

export const Description = styled(Text)`
    grid-area: description;
`

export const Icon = styled(Text)`
    grid-area: icon;
    font-size: 14px;
`
