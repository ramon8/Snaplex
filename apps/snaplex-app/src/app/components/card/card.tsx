import { useRef } from "react";
import { CardProps } from "./card.interface"
import { CardHeader, ContainerCard, ContainerChildren } from "./card.styles"

export const Card = ({ areaRef, showChildCard = false, ...props }: CardProps) => {

    const cardContainerRef = useRef(null);

    const childrenCard: CardProps = {
        areaRef: cardContainerRef,
    }

    return <ContainerCard ref={cardContainerRef} drag dragConstraints={areaRef} dragElastic={1} {...props}>
        <CardHeader>Villager</CardHeader>
        {showChildCard && <ContainerChildren>
            <Card {...childrenCard} />
        </ContainerChildren>}
    </ContainerCard>
}