import { ButtonProps } from "./button.interface"
import { ContainerButton } from "./button.styles"
import { Text } from './../text'

export const Button = ({ onClick, value, ...props }: ButtonProps) => {
    return <ContainerButton onClick={onClick} {...props}>
        <Text size={1} stroke={3} bottomShadow={3}>{value}</Text>
    </ContainerButton>
}