import { Button } from "@components"
import { Card } from "@components/card"
import { Card as CardI } from "@types";
import { allCards, Draculex, Limón, Mandarina, Melón, Piña, Plátano, Sandía, Uvas } from "@mocks/card.mocks"
import { PlaygroundProps } from "./playground.interface"
import { AlbumGrid, ContainerPlayground } from "./playground.styles"

export const Playground = ({ ...props }: PlaygroundProps) => {
    return <ContainerPlayground {...props}>
        <AlbumGrid>
            {allCards.map((card: CardI) => <Card {...card} />)}
        </AlbumGrid>
        {/* <Card {...Draculex} /> */}
        {/* <Button value="SLAP" /> */}
    </ContainerPlayground>
}