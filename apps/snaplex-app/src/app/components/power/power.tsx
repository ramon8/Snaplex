import { PowerProps } from "./power.interface"
import { ContainerPower } from "./power.styles"

export const Power = ({ value, ...props }: PowerProps) => {
    return <ContainerPower {...props}>{value}</ContainerPower>
}