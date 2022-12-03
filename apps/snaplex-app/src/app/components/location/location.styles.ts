import styled from "styled-components";

export const ContainerLocation = styled.div`
    display: grid;
    place-items: center;
    gap: 16px;
`

export const LocationInfoContainer = styled.div`
    display: grid;
    place-items: center;
    
    background: greenyellow;
    border-radius: 50%;
    
    width: 200px;
    height: 200px;

    font-size: 16px;
`

export const LocationName = styled.div`
`

export const LocationDescription = styled.div`
`

export const LocationCardsCotnainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;

    background: lightgray;
    width: 200px;
    height: 250px;

    border-radius: 8px;
`