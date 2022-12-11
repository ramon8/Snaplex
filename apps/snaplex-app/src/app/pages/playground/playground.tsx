import { Button } from "@components"
import { Card } from "@components/card"
import { Card as CardType } from "@types";
import { PlaygroundProps } from "./playground.interface"
import { AlbumGrid, ContainerPlayground } from "./playground.styles"

export const Playground = ({ ...props }: PlaygroundProps) => {
    return <ContainerPlayground {...props}>
        <AlbumGrid>
            {[].map((card: CardType) => <Card {...card} />)}
        </AlbumGrid>
    </ContainerPlayground>
}