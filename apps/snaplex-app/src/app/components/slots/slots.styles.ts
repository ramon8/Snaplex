import { Reorder } from "framer-motion";
import styled from "styled-components";

export const ContainerSlots = styled.div`
    display: grid;
    height: 100%;
    position: relative;
`

export const ContainerFigures = styled.div`
    &>div{
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
        position: relative;
    }
`

export const ContainerFigurePlacements = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    height: 100%;
    position: absolute;
    left: -3.5rem;
    transform: translate(-50%);
    left: 50%;
`

export const ContainerPlacements = styled.div`
    box-sizing: border-box;
    height: 10rem;
    width: 6rem;
    top: 0;
    left: 0;
`
