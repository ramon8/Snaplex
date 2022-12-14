import { motion } from "framer-motion";
import styled from "styled-components";
import { Text } from '../../text'
import { CardDetailProps } from "./cardDetail.interface";

export const ContainerCardDetail = styled(motion.div)((props: Partial<CardDetailProps>) => `
    z-index: 1;
    display: grid;
    place-items: center;
    text-align: center;

    grid-template: 
        " mana        power       " auto
        " .           .           " 2fr
        " name        name        " 1fr
        " description description " auto
        / 1fr         1fr;

    width: 347px;
    height: 542px;
    padding: 2rem 2.5rem;
    text-align: center;

    background: #D6D6D6;
    border-radius: .5rem;
    background-image: url(${props.image});
    background-size: cover;
    border: 2px solid black;
    box-shadow: 0px 3px 0px black;

    box-sizing: border-box;
    cursor: grab;
    &:active{
        cursor: grabbing;
    }
`)

export const Name = styled(Text)`
    grid-area: name;
    `
export const Power = styled(Text)`
    grid-area: power;
    place-self: end;
    `
export const Mana = styled(Text)`
    place-self: end start;
    grid-area: mana;
`
export const Description = styled(Text)`
    grid-area: description;
    margin: 1rem 0;
`
export const Icon = styled(Text)`
    grid-area: icon;
`