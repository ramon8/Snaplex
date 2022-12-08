import { Card } from "@components/card"
import { RootState } from "@store"
import { useSelector } from "react-redux"
import { DeckProps } from "./deck.interface"
import { ContainerDeck } from "./deck.styles"

export const Deck = ({ ...props }: DeckProps) => {
    const { deck } = useSelector((state: RootState) => state.player)
    return <ContainerDeck {...props}>{deck.map(card => <Card {...card} />)}</ContainerDeck>
}