import { Card } from "@components/card";
import { HandProps } from "./hand.interface"
import { ContainerHand } from "./hand.styles"

export const Hand = ({ cards, ...props }: HandProps) => {
    return <ContainerHand {...props}>{
        cards.map((_, i) => <Card key={i} />)
    }</ContainerHand>
}