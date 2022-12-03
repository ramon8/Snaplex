import styled from "styled-components";

export const ContainerButton = styled.div`
    width: fit-content;
    cursor: pointer;
    background: lightblue;
    color: white;
    font-weight: bolder;
    padding: 8px;
    margin: 4px;
    border-radius: 4px;
    &:hover{
        background: lightgreen;
    }
    &:active{
        background: greenyellow;
    }
`