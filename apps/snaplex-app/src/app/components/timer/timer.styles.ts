import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";
import { TimerProps, TimerType } from "./timer.interface";

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

export type PartialTimerProps = Partial<TimerProps>
export const ContainerTimer = styled(motion.div)`
    width: 371px;
    height: 11px;
    background: #580000;
    box-shadow: inset 0px 5px 1px #981a1a, 0px 2px 0px black;
    border-radius: .5rem;
    border: 2px solid black;
    position: relative;
    overflow: hidden;
`

export const TimerValue = styled(motion.div)`
    border-radius: .5rem 0 0 .5rem;
    height: 100%;
    position: absolute;
    background: #d41515;
    box-shadow: inset 0px 5px 1px #e32727;
`

/**
 * &:after{
            content: '';
            border-radius: .5rem 0 0 .5rem;
            height: 100%;
            position: absolute;
            background: ${colors.afterBackground};
            box-shadow: ${colors.afterShadow};
        }
 */