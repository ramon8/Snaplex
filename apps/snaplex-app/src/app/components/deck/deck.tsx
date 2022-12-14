import { Card } from "@components"
import { RootState } from "@store"
import { useSelector } from "react-redux"
import { DeckProps } from "./deck.interface"
import { ContainerDeck } from "./deck.styles"

export const Deck = ({ cards, ...props }: DeckProps) => {
    let { deck } = useSelector((state: RootState) => state.player)
    if (cards !== undefined) deck = cards;
    return <ContainerDeck {...props}>{deck.map(card => <Card {...card} />)}</ContainerDeck>
}