import { Mana } from "@components/mana";
import { Button } from "@components/button"
import { Hand } from "@components/hand"
import styled, { keyframes } from "styled-components";
import { Deck } from "@components/deck";

export const ContainerFooter = styled.div`
    display: grid;
    grid-template:
        " mana mana mana " 
        " .    .    timer  "
        " hand hand btn  "
        / 1fr  1fr  auto;
    place-items: center;
        
    padding: 16px;
    gap: 32px 8px;
`

export const ManaStyled = styled(Mana)`
    grid-area: mana;
    font-size: 42px;
    width: 64px;
    height: 64px;

    place-self: center;
`

export const ButtonStyled = styled(Button)`
    grid-area: btn;
    height: fit-content;
`

export const HandStyled = styled(Hand)`
    grid-area: hand;
    height: 180px;
`

export const DeckStyled = styled(Deck)`
    position: fixed;
    bottom: 0;
    transform: translate(0, 100%)
`