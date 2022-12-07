import { RootState } from "@store/index"
import { socket } from "apps/snaplex-app/src/main"
import { useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ButtonStyled, ContainerFooter, HandStyled, ManaStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
  const state = useSelector((state: RootState) => state);
  const onClickButton = () => {
    socket.emit("FINISH_TURN", state.actions)
  }

  return <ContainerFooter  {...props}>
    <ManaStyled value={state.player.mana} />
    <ButtonStyled onClick={onClickButton} value={`Turno ${state.game.turn} / ${state.game.maxTurns}`} />
    <HandStyled />
  </ContainerFooter>
}
