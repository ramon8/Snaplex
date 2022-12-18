import { Content } from "@components/content";
import styled, { css, keyframes } from "styled-components";


export const ContainerStore = styled.div((props: any) => css`
    display: grid;
    place-items: center;
    text-align: center;

    width: 5.4em;
    height: 7em;
    border-radius: .2em;

    color: white;
    background: black;
    position: relative;
`)

export const StoreIcon = styled.div`
    font-size: 2em;
`

export const StoreName = styled(Content)`
    font-size: .75em;
`
export const StoreDescription = styled(Content)`
    font-size: .75em;
`