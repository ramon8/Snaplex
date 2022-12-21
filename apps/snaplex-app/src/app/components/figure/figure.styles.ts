import { motion, Reorder } from "framer-motion";
import styled from "styled-components";

export const ContainerFigure = styled(motion.div)`
    display: grid;
    place-items: center;
    background: lightblue;
    border: .2rem solid blue;
    height: 10rem;
    width: 6rem;
    border-radius: 50%;
`