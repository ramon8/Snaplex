import styled from "styled-components";

export const ContainerBoard = styled.div`
    display: grid;
    place-items: center;
    grid-template-rows: auto auto auto 1fr auto auto;

    gap: 1rem;
    
    width: 100%;
    height: 100%;

    box-sizing: border-box;
`