import styled, { css, keyframes } from "styled-components";
import { TimerProps, TimerType } from "./timer.interface";

/**
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
     animation: ${props['data-disabled'] && css`${timerAnimation} 60s infinite linear`}; 
 `)
 */

interface TimerColor {
    background: string;
    shadow: string;
    afterBackground: string;
    afterShadow: string;
}

const timerColors: Record<TimerType, TimerColor> = {
    danger: {
        background: '#580000',
        shadow: 'inset 0px 5px 1px #981a1a, 0px 2px 0px black',
        afterBackground: '#d41515',
        afterShadow: 'inset 0px 5px 1px #e32727',
    },
    default: {
        background: '#003858',
        shadow: 'inset 0px 5px 1px #1a6b99, 0px 2px 0px black',
        afterBackground: '#089BEE',
        afterShadow: 'inset 0px 5px 1px #1fa6f3',
    }
}

export const ContainerTimer = styled.div((props: TimerProps) => {
    const colors: TimerColor = timerColors[props.type as TimerType];
    return `
        width: 371px;
        height: 11px;
        background: ${colors.background};
        box-shadow: ${colors.shadow};
        border-radius: .5rem;
        border: 2px solid black;
        position: relative;
        &:after{
            content: '';
            border-radius: .5rem 0 0 .5rem;
            width: ${props.value}%;
            height: 100%;
            position: absolute;
            background: ${colors.afterBackground};
            box-shadow: ${colors.afterShadow};
        }
`
})