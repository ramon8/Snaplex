import { Deck } from "@components/deck"
import { RootState } from "@store/index"
import { actionsActions } from "@store/slices/actions/actionsSlice"
import { socket } from "apps/snaplex-app/src/main"
import { useDispatch, useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ButtonStyled, ContainerFooter, DeckStyled, HandStyled, ManaStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onClickButton = () => {
    console.log({ state });
    socket.emit("FINISH_TURN", state.actions)
  }

  return <ContainerFooter  {...props}>
    <ManaStyled value={state.player.mana} />
    <ButtonStyled onClick={onClickButton} value={`Turno ${state.game.turn} / ${state.game.maxTurns}`} />
    <HandStyled />
    <DeckStyled />
  </ContainerFooter>
}
