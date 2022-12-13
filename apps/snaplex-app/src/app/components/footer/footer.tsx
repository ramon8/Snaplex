import { RootState } from "@store/index"
import { socket } from "apps/snaplex-app/src/main"
import { useDispatch, useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ButtonStyled, ContainerButtonTurn, ContainerFooter, DeckStyled, HandStyled, ManaStyled, TimerStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
  const { actions, mana } = useSelector((state: RootState) => state.player);
  const { winner, turn, maxTurns } = useSelector((state: RootState) => state.game);
  const timerValue = 85;

  const onClickButton = () => {
    socket.emit("FINISH_TURN", actions)
  }

  return <ContainerFooter  {...props}>
    <HandStyled />
    <ContainerButtonTurn>
      <TimerStyled type={timerValue > 80 ? 'danger' : 'default'} value={timerValue} max={100} disabled={false} />
      <ButtonStyled onClick={onClickButton} value={`END TURN ${turn}/${maxTurns}`} />
      <ManaStyled value={mana} />
    </ContainerButtonTurn>
    {/* <DeckStyled /> */}
  </ContainerFooter>
}
