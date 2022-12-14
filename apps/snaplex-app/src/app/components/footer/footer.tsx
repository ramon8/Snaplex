import { RootState } from "@store/index"
import { playerActions } from "@store/slices"
import { socket } from "apps/snaplex-app/src/main"
import { useDispatch, useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ButtonStyled, ContainerButtonTurn, ContainerFooter, DeckStyled, HandStyled, ManaStyled, TimerStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
  const { game: { turn, maxTurns }, player } = useSelector((state: RootState) => state);
  const { actions, mana, turnFinished } = player;
  const dispatch = useDispatch();

  const onClickButton = () => {
    dispatch(playerActions.setPlayer({ player: { ...player, turnFinished: true } }));
    socket.emit("FINISH_TURN", actions)
  }

  return <ContainerFooter  {...props}>
    <HandStyled />
    <ContainerButtonTurn>
      {!turnFinished && <TimerStyled />}
      <ButtonStyled onClick={onClickButton} value={`END TURN ${turn}/${maxTurns}`} />
      <ManaStyled value={mana} />
    </ContainerButtonTurn>
    <DeckStyled />
  </ContainerFooter>
}
