import { ManaProps } from "./mana.interface"
import { ContainerMana } from "./mana.styles"

export const Mana = ({ value, ...props }: ManaProps) => {
    return <ContainerMana shouldAnimate stroke={10} bottomShadow={3} {...props}>{value}</ContainerMana>
}