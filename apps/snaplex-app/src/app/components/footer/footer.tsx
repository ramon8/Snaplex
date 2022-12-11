import { RootState } from "@store/index"
import { socket } from "apps/snaplex-app/src/main"
import { useDispatch, useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ButtonStyled, ContainerFooter, DeckStyled, HandStyled, ManaStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
  const { actions, mana } = useSelector((state: RootState) => state.player);
  const { winner, turn, maxTurns } = useSelector((state: RootState) => state.game);

  const onClickButton = () => {
    socket.emit("FINISH_TURN", actions)
  }

  return <ContainerFooter  {...props}>
    <ManaStyled value={mana} />
    {/* <Timer disabled={state.game.timer} /> */}
    <ButtonStyled onClick={onClickButton} value={`Turno ${turn} / ${maxTurns}`} />
    <HandStyled />
    <DeckStyled />
  </ContainerFooter>
}
