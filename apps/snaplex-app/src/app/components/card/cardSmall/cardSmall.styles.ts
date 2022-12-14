import { Text } from "@components/text";
import { motion } from "framer-motion";
import styled from "styled-components";
import { CardSmallProps } from "./cardSmall.interface";

type PartialProps = Partial<CardSmallProps>;
export const ContainerCardSmall = styled(motion.div)((props: PartialProps) => `
    display: grid;
    place-items: center;
    rotate: ${props.rotation}deg;
    grid-template:
        " .    power " auto
        " .    .     " 1fr
        " name name  " auto
        / 1fr  1fr;

    background: #D6D6D6;
    background-image: url(${props.image});
    background-size: cover;
    border-radius: .25rem;
    border: 2px solid black;
    padding: 0 .25rem;

    width: 42px;
    height: 67px;

    box-sizing: border-box;
    cursor: pointer;
`)

export const StyledPower = styled(Text)`
    grid-area: power;
    font-size: 12px;
    place-self: end;
`

export const StyledIcon = styled.div`
    grid-area: icon;
`

export const StyledName = styled(Text)`
    grid-area: name;
    font-size: 10px;
    text-align: center;
`
