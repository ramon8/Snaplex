import styled, { css, keyframes } from "styled-components";

const timerAnimation = keyframes`
    0% { width: 100%; }
    100% { width: 0px }
`
export const ContainerTimer = styled.div((props: any) => css`
    place-self: start;
    grid-area: timer;
    width: 100%;
    height: 50px;
    background: red; 
    animation: ${props['data-disabled'] && css`${timerAnimation} 5s infinite linear`}; 
`)