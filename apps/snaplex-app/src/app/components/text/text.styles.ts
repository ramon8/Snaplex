import styled from "styled-components";
import { TextProps } from "./text.interface";


export const ContainerText = styled.div((props: TextProps) => `
    color: white;
    -webkit-text-stroke: ${props.stroke}px black; 
    text-shadow: calc(-${props.size}px / 2) ${props.size}px black;
    font-size: ${props.size}rem;
`)