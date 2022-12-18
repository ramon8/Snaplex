import { ContentProps } from "./content.interface"
import { ContainerContent } from "./content.styles"

export const Content = ({ children, ...props }: ContentProps) => {
    return <ContainerContent {...props}>{children}</ContainerContent>
}