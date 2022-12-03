import { ButtonProps } from "./button.interface"
import { ContainerButton } from "./button.styles"

export const Button = ({ onClick, value, ...props }: ButtonProps) => {
    return <ContainerButton onClick={onClick} {...props}>{value}</ContainerButton>
}