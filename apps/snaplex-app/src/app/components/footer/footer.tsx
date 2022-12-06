import { Mana } from "@components/mana"
import { RootState } from "@store/index"
import { socket } from "apps/snaplex-app/src/main"
import { useSelector } from "react-redux"
import { adaptNextTurn } from "../../adapters/adapters"
import { FooterProps } from "./footer.interface"
import { ContainerFooter, ManaStyled, ButtonStyled, HandStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
    const state = useSelector((state: RootState) => state);
    const onClickButton = () => {
        socket.emit("FINISH_TURN", adaptNextTurn(state))
    }

    return <ContainerFooter  {...props}>
        <ManaStyled value={state.player.mana} />
        <ButtonStyled onClick={onClickButton} value={`Turno ${state.game.turn} / ${state.game.maxTurns}`} />
        <HandStyled />
    </ContainerFooter>
}