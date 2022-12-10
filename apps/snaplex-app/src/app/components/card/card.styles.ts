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

        
        width: calc(347px / 4);
        height: calc(542px / 4);
        padding: .5rem .75rem;
        
    background: #D6D6D6;
    background-image: url(${props.image});
    background-size: cover;
    border-radius: .5rem;
    border: 2px solid black;

    box-sizing: border-box;
    cursor: grab;
    &:active{
        cursor: grabbing;
    }
`)

export const Name = styled(Text)`
    grid-area: name;
`

export const ContainerCardDetail = styled.div`
    display: grid;
    place-items: center;

    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    
    width: 100%;
    height: 100%;
    
    background: rgba(0,0,0,0.5);
`

export const PowerStyled = styled(Text)`
    grid-area: power;
    transform: rotate(15deg);
    place-self: end;
`

export const ManaValueStyled = styled(Text)`
    place-self: end start;
    transform: rotate(-15deg);
    grid-area: mana;
`

export const Description = styled(Text)`
    grid-area: description;
`

export const Icon = styled(Text)`
    grid-area: icon;
`