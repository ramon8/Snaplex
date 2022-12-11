import styled from "styled-components";

export const ContainerSite = styled.div`
    display: grid;
    place-items: center;
    gap: 16px;
`

export const SiteInfoContainer = styled.div`
    display: grid;
    place-items: center;
    
    background: greenyellow;
    border-radius: 50%;
    
    width: 200px;
    height: 200px;

    font-size: 16px;
`

export const SiteName = styled.div`
`

export const SiteDescription = styled.div`
`

export const SiteCardsCotnainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;

    background: lightgray;
    width: 200px;
    height: 250px;

    border-radius: 8px;
`