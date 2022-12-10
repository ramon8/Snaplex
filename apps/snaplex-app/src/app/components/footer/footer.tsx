import { Deck } from "@components/deck"
import { Timer } from "@components/timer"
import { RootState } from "@store/index"
import { gameActions } from "@store/slices"
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
    dispatch(gameActions.setTimer({ timer: false }))
    socket.emit("FINISH_TURN", state.actions)
  }

  return <ContainerFooter  {...props}>
    <ManaStyled value={state.player.mana} />
    {state.game.winner === undefined && 
      <>
        <Timer disabled={state.game.timer} />
        <ButtonStyled onClick={onClickButton} value={`Turno ${state.game.turn} / ${state.game.maxTurns}`} />
      </>
    }
    <HandStyled />
    <DeckStyled />
  </ContainerFooter>
}
