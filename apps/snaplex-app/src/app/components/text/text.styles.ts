import { motion } from "framer-motion";
import styled from "styled-components";
import { TextProps } from "./text.interface";


export const ContainerText = styled(motion.div)((props: TextProps) => `
    display: grid;
    color: white;
    font-size: ${props.size}rem;
    position: relative;
    z-index: 1;
    &:before{
        content: "${props.children}";
        position: absolute;
        top: 0;
        left: 0;
        -webkit-text-stroke: ${props.stroke}px black; 
        z-index: -1;
    }
    &:after{
        content: "${props.children}";
        position: absolute;
        top: ${props.bottomShadow}px;
        left: 0;
        z-index: -2;
        -webkit-text-stroke: ${props.stroke}px black; 
    }
`)