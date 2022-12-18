import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";

const animationKeyframes = keyframes`
    0% { 
        background-position: 
            -2em 0, 
            2em 100%, 
            0 2em, 
            100% 0; 
        }
    100% { 
        background-position: 
            0 0, 
            0 100%,
            0 0,
            100% 2em;
        }
`

export const ContainerCard = styled(motion.div)((props: any) => css`
    width: 5.4em;
    height: 7em;
    background: black;
    border-radius: .3em;

    background: #fbf2e1;
    border: .2em solid black;
    cursor: grab;
    &:active{
        cursor: grabbing;
    }

    ${props['data-candrop'] && css`
        &:before{
            content: '';
            
            position: absolute;
            top: -.7em;
            left: -.7em;
    
            width: calc(100% + 1.25em);
            height: calc(100% + 1.25em);
            background-repeat: no-repeat;
            background: 
                linear-gradient(90deg, transparent 50%, white 50%) repeat-x,
                linear-gradient(90deg, transparent 50%, white 50%) repeat-x,
                linear-gradient(180deg, transparent 50%, white 50%) repeat-y,
                linear-gradient(180deg, transparent 50%, white 50%) repeat-y;
                
            background-size: 
                2em .5em,
                2em .5em,
                .5em 2em,
                .5em 2em;
            ${css`animation: ${animationKeyframes} .8s linear infinite;`}
        }
    `}
`)

export const CardHeader = styled.div`
    background: #f7e4ad;
    border-bottom: .2em solid black;
    font-size: .8em;
`
export const ContainerChildren = styled.div`
    position: relative;
    top: 2.5em;
`