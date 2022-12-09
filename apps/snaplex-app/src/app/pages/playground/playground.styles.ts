import styled from "styled-components";

export const ContainerPlayground = styled.div`
    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;
    background: #BEBEBE;
    
    overflow: scroll;
    `
export const AlbumGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: .5rem;
    place-items: center;
    
    width: fit-content;
    height: 100%;
`