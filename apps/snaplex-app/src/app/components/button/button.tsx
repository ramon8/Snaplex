import { ButtonProps } from "./button.interface"
import { ContainerButton } from "./button.styles"

export const Button = (props: ButtonProps) => {
    return <ContainerButton {...props}>Next...</ContainerButton>
}