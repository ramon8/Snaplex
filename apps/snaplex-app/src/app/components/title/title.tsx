import { TitleProps } from "./title.interface"
import { ContainerTitle } from "./title.styles"

export const Title = ({ children, ...props }: TitleProps) => {
    return <ContainerTitle {...props}>{children}</ContainerTitle>
}