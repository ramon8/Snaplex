import { Card, CardProps, HandProps } from "@components";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { ContainerHand } from "./hand.styles"

export const Hand = (props: HandProps) => {
    const hand = useSelector((state: RootState) => state.player.hand)
    return <ContainerHand {...props}>
        {hand.map((card: CardProps) => <Card {...card} key={card.id} type="hand" drag />)}
    </ContainerHand>
}