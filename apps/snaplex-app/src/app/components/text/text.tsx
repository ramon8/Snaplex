import { TextProps } from "./text.interface"
import { ContainerText } from "./text.styles"

export const Text = ({ children, size = 2, stroke = 1, ...props }: TextProps) => {
    return <ContainerText {...props} size={size} stroke={stroke}>{children}</ContainerText>
}