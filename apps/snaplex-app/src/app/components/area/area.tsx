import { Card } from "@components/card"
import { cardsMock } from "@mocks";
import { useRef } from "react";
import { AreaProps } from "./area.interface"
import { ContainerArea } from "./area.styles"

export const Area = ({ ...props }: AreaProps) => {

    const areaRef = useRef(null);

    const cards = cardsMock;

    return <ContainerArea ref={areaRef} {...props}>{
        cards.map(card => <Card areaRef={areaRef} showChildCard={true} />)
    }</ContainerArea>
}