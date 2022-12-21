import { Card } from "@components/card";
import { Figure } from "@components/figure";
import { Figure as FigureType } from "@types";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { SlotsProps } from "./slots.interface"
import { ContainerFigurePlacements, ContainerFigures, ContainerPlacements, ContainerSlots } from "./slots.styles"

export const Slots = ({ figures, ...props }: SlotsProps) => {

    const [localFigures, setLocalFigures] = useState<FigureType[]>(figures);

    useEffect(() => {
        setLocalFigures(figures)
    }, [figures]);

    const placements = [...localFigures.filter(figure => !figure.temporal), 1];
    console.log({ placements })

    return <ContainerSlots {...props} >
        <ContainerFigurePlacements>
            {placements.map((_, i) => <ContainerPlacements data-id={`${i}`} />)}
        </ContainerFigurePlacements>
        <ContainerFigures>
            <Reorder.Group as="div" axis="x" values={localFigures} onReorder={setLocalFigures}>
                {localFigures.map(({ id, ...figure }) => <Reorder.Item as={"div"} key={id} value={figure} >
                    <Figure id={id} {...figure} />
                </Reorder.Item>
                )}
            </Reorder.Group>
        </ContainerFigures>
    </ContainerSlots>


}