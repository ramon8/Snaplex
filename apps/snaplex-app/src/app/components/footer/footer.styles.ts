import { Mana } from "@components/mana";
import { Button } from "@components/button"
import { Hand } from "@components/hand"
import styled from "styled-components";

export const ContainerFooter = styled.div`
    display: grid;
    grid-template:
        " mana mana mana " 
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