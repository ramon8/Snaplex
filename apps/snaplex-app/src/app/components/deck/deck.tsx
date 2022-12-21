import { DeckProps } from "./deck.interface"
import { ContainerDeck } from "./deck.styles"

export const Deck = ({ ...props }: DeckProps) => {
    return <ContainerDeck {...props}>deck</ContainerDeck>
}