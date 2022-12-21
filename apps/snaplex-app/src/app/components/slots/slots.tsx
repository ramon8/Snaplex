import { Card } from "@components/card";
import { Figure } from "@components/figure";
import { Figure as FigureType } from "@types";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { SlotsProps } from "./slots.interface"
import { ContainerSlots } from "./slots.styles"

export const Slots = ({ figures, ...props }: SlotsProps) => {

    const [localFigures, setLocalFigures] = useState<FigureType[]>(figures);



    return <ContainerSlots data-slot="slot" {...props} axis="x" values={localFigures} onReorder={setLocalFigures}>
        {/* {localFigures.map(({ id, value }) => <Figure key={id} id={id} />)} */}
        {localFigures.map(figure => <Reorder.Item as={"div"} key={figure.id} value={figure} >
            <Figure id={figure.id} />
        </Reorder.Item>
        )}
    </ContainerSlots>


}