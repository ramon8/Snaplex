import { Face } from "@components/face"
import { Hand } from "@components/hand"
import { Slots } from "@components/slots"
import { RootState } from "@store"
import { gameActions } from "@store/slices"
import { useDispatch, useSelector } from "react-redux"
import { BoardProps } from "./board.interface"
import { ContainerBoard } from "./board.styles"

export const Board = ({ ...props }: BoardProps) => {

    const { game: { playerCards, oponentCards, playerFigures, oponentFigures } } = useSelector((state: RootState) => state);

    return <ContainerBoard {...props}>
        <Hand cards={oponentCards} />
        <Face />
        {/* <Slots figures={oponentFigures} /> */}
        <Slots figures={playerFigures} />
        <Face />
        <Hand cards={playerCards} />
    </ContainerBoard>
}