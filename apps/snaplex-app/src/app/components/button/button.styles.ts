import { motion } from "framer-motion";
import styled from "styled-components";

export const ContainerButton = styled(motion.div)`
    display: grid;
    place-items: center;
    
    background: #EEC408;
    color: white;
    font-weight: bolder;
    
    width: fit-content;
    height: 80px;
    padding: .5rem 4rem;
    /* margin: .25rem; */
    border-radius: .5rem;
    box-shadow:
        0 7px 0 #a6532b,
        inset 0px 4px 0px #f9ec42,
        0px 0px 0px 2px black,
        0px 0px 0px 2px black,
        0px 9px 0px 2px black,
        1px 1px 1px black;
    transform: perspective(300px) rotateX(10deg);
    transition: .1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    position: relative;
    top: 0px;
    
    cursor: pointer;
    & div{
        position: relative;
        top: 0px;
    }
    &:active{
        position: relative;
        top: 7px;
        box-shadow: 
            0 0px 0 #a6532b,
            inset 0px 4px 0px #f9ec42,
            0px 0px 0px 2px black,
            0px 0px 0px 2px black,
            0px 3px 0px 2px black,
            1px 1px 1px black;;
        & div{
            position: relative;
            top: 3px;
            text-shadow: 0 0 black;
            transition: .1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
        }
    }
`