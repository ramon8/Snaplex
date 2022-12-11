import React from "react"
import { MainProps } from "./main.interface"
import { ContainerMain } from "./main.styles"
import { Site } from '@components'
import { useSelector } from "react-redux"
import { RootState } from "@store/index"

export const Main = ({ name }: MainProps) => {
    const locations = useSelector((state: RootState) => state.game.sites)
    return <ContainerMain>{
        locations?.map((location: any) => <Site key={location.id} {...location} />)}
    </ContainerMain>
}