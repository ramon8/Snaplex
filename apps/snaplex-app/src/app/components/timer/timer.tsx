import { TimerProps } from "./timer.interface"
import { ContainerTimer } from "./timer.styles"

export const Timer = ({ disabled, type = 'default', ...props }: TimerProps) => {
    return <ContainerTimer type={type} {...props} data-disabled={disabled}></ContainerTimer>
}