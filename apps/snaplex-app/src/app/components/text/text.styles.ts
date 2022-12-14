import { motion } from "framer-motion";
import styled from "styled-components";
import { TextProps } from "./text.interface";


export const ContainerText = styled(motion.div)((props: TextProps) => `
    display: grid;
    color: white;
    font-size: ${props.size}rem;
    position: relative;
    z-index: 1;
    place-items:center;
    &:before{
        content: "${props.children}";
        position: absolute;
        -webkit-text-stroke: ${props.stroke}px black; 
        z-index: -1;
    }
    &:after{
        content: "${props.children}";
        position: absolute;
        ${props.bottomShadow && `top: ${props.bottomShadow}px`};
        z-index: -2;
        -webkit-text-stroke: ${props.stroke}px black; 
    }
`)