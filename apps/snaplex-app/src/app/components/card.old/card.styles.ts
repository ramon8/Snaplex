import { motion } from "framer-motion";
import styled, { StyledComponent } from "styled-components";
import { Power } from "@components/power"
import { Mana } from "@components/mana";
import { CardType } from "./card.interface";

const gridTypes: Record<CardType, string> = {
    "location": `
        " .    .    powe " auto
        " icon icon icon " 1fr
        / 1fr  1fr  1fr
    `,
    "hand": `
        " name name powe " 30px
        " icon icon icon " auto
        " mana .    .    " 30px
        / 1fr  1fr  1fr
    `,
}
const sizeType: Record<CardType, string> = {
    "location": `
        width: 60px;
        height: 100px
    `,
    "hand": `
        width: 100px;
        height: 160px
    `,
}

const iconSizeType: Record<CardType, string> = {
    "location": "3",
    "hand": "5",
}
export const ContainerCard = styled(motion.div)((props: any) => `
    display: grid;

    width: fit-content;
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;

    background: white;
    ${sizeType[props["data-type"] as CardType]};
    grid-template: ${gridTypes[props["data-type"] as CardType]};
    cursor: pointer;
`)

export const Name = styled.div`
    grid-area: name;
    place-self: center;
`
export const Description = styled.div`
    grid-area: desc;
    background: lightblue;
    padding: 8px;
    margin: 4px;
    border-radius: 4px;
    color: white;
`
export const Icon = styled.div((props: any) => `
    grid-area: icon;
    font-size: 16px;
    place-self: center;
    scale: ${iconSizeType[props["data-type"] as CardType]};
`)
export const StyledPower = styled(Power)`
    grid-area: powe;
    place-self: end;
`
export const StyledMana = styled(Mana)`
    grid-area: mana;
`