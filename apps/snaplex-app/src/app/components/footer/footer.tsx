import { RootState } from "@store/index"
import { socket } from "apps/snaplex-app/src/main"
import { mapRange } from "apps/snaplex-app/src/utils/mapRange"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ButtonStyled, ContainerButtonTurn, ContainerFooter, HandStyled, ManaStyled, TimerStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
  const { game: { turn, maxTurns, turnStartedAt }, player: { actions, mana } } = useSelector((state: RootState) => state);

  const turnEndsAt = useMemo(() => turnStartedAt + 30000, [turnStartedAt])
  const timerValue = mapRange(turnEndsAt - new Date().getTime(), 0, 30000, 0, 30);
  console.log(timerValue);


  const onClickButton = () => {
    socket.emit("FINISH_TURN", actions)
  }

  return <ContainerFooter  {...props}>
    <HandStyled />
    <ContainerButtonTurn>
      <TimerStyled type={turnEndsAt > 80 ? 'danger' : 'default'} value={timerValue} max={100} disabled={false} />
      <ButtonStyled onClick={onClickButton} value={`END TURN ${turn}/${maxTurns}`} />
      <ManaStyled value={mana} />
    </ContainerButtonTurn>
    {/* <DeckStyled /> */}
  </ContainerFooter>
}
