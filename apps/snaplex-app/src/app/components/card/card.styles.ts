import { motion } from "framer-motion";
import styled from "styled-components";

export const ContainerCard = styled(motion.div)`
    width: 4rem;
    height: 7rem;
    border-radius: .5rem;
    padding: 1rem;

    border: .25rem solid blue;

    background: lightblue;
    &:hover{
        cursor: grab;
    }
`