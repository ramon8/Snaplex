import { motion } from "framer-motion";
import styled from "styled-components";

export const ContainerMain = styled(motion.div)`
    display: grid;
    place-items: center;

    grid-template-rows: auto 1fr;
    width: 75em;
    height: 60em;

    background: #b0ddb3;
    border-radius: .2em;
    box-shadow: 
        0 0 0 .4em black,
        0 0 0 .8em white;
`

export const ContainerDraggArea = styled(motion.div)`
    width: 100px;
    height: 100px;
    border: 5px solid yellow;
    box-sizing: border-box;
    transform: perspective(400px) rotateX(2.5deg); 
`