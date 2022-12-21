import { ManaCoinProps } from "./manaCoin.interface"
import { ContainerManaCoin } from "./manaCoin.styles"

export const ManaCoin = ({ ...props }: ManaCoinProps) => {
    return <ContainerManaCoin {...props}>manaCoin</ContainerManaCoin>
}