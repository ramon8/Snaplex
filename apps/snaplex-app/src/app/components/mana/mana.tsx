import { ManaProps } from "./mana.interface"
import { ContainerMana } from "./mana.styles"

export const Mana = ({ value, ...props }: ManaProps) => {
    return <ContainerMana {...props}>{value}</ContainerMana>
}