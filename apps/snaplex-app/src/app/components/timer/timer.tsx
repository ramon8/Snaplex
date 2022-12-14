import { RootState } from "@store";
import { mapRange } from "apps/snaplex-app/src/utils/mapRange";
import { useSelector } from "react-redux";
import { TimerProps } from "./timer.interface";
import { ContainerTimer, TimerValue } from "./timer.styles";

export const Timer = ({ disabled, type = 'default', shouldAnimate = false, ...props }: TimerProps) => {

  const { game: { turnStartedAt, sites, maxTurnTime } } = useSelector((state: RootState) => state);

  const turnEndsAt = (turnStartedAt + maxTurnTime) - new Date().getTime();

  const timerPercentageValue = mapRange(turnEndsAt, 0, maxTurnTime, 0, 100);
  const timerSecondsValue = mapRange(turnEndsAt, 0, maxTurnTime, 0, maxTurnTime / 1000);
  console.log(maxTurnTime);

  return <ContainerTimer {...props}>
    <TimerValue
      key={timerSecondsValue}
      animate={{ width: '100%' }}
      initial={{ width: `${100 - timerPercentageValue}%` }}
      transition={{ duration: timerSecondsValue, repeat: 0, ease: "linear" }}
    /></ContainerTimer>
}
