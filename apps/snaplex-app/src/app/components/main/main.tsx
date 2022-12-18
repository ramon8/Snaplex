
import { Area } from "@components/area"
import { Content } from "@components/content"
import { Header } from "@components/header"
import { Subtitle } from "@components/subtitle"
import { Title } from "@components/title"
import { useRef } from "react"
import { MainProps } from "./main.interface"
import { ContainerDraggArea, ContainerMain } from "./main.styles"

export const Main = () => {
    const dragConstraints = useRef(null);
    return <ContainerDraggArea ref={dragConstraints}>
        <ContainerMain dragMomentum={false} dragConstraints={dragConstraints} drag>
            <Header></Header>
            <Area></Area>
        </ContainerMain>
    </ContainerDraggArea>
}