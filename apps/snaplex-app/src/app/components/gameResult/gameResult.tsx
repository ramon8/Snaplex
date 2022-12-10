import { GameResultProps } from "./gameResult.interface"
import { ContainerGameResult } from "./gameResult.styles"

export const GameResult = ({ ...props }: GameResultProps) => {
    return <ContainerGameResult {...props}>gameResult</ContainerGameResult>
}