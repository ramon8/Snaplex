import { ManaProps } from "./mana.interface"
import { ContainerMana } from "./mana.styles"

export const Mana = ({ ...props }: ManaProps) => {
    return <ContainerMana {...props}>mana</ContainerMana>
}