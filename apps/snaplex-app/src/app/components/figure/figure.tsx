import { FigureProps } from "./figure.interface"
import { ContainerEmptyFigure, ContainerFigure } from "./figure.styles"

export const Figure = ({ temporal, ...props }: FigureProps) => {
    return !temporal ? <ContainerFigure>Test</ContainerFigure> : <ContainerEmptyFigure />
}