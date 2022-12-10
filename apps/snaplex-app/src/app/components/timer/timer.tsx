import { TimerProps } from "./timer.interface"
import { ContainerTimer } from "./timer.styles"

export const Timer = ({ disabled, ...props }: TimerProps) => {
    return <ContainerTimer {...props} data-disabled={disabled}></ContainerTimer>
}