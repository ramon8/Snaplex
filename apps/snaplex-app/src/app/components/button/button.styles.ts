import styled from "styled-components";

export const ContainerButton = styled.div`
    width: fit-content;
    cursor: pointer;
    background: black;
    color: white;
    font-weight: bolder;
    padding: 8px;
    margin: 4px;
    border-radius: 4px;
    &:hover{
        background: gray;
    }
    &:active{
        background: lightgray;
    }
`