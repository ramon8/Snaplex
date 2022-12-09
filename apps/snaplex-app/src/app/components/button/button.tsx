import { ButtonProps } from "./button.interface"
import { ContainerButton } from "./button.styles"
import { Text } from './../text'

export const Button = ({ onClick, value, ...props }: ButtonProps) => {
    return <ContainerButton
        onClick={onClick}
        // whileTap={{ scale: 1.1 }}
        {...props}>{
            <Text>{value}</Text>
        }</ContainerButton>
}