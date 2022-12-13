import { PowerProps } from "./power.interface"
import { ContainerPower } from "./power.styles"

export const Power = ({ value, ...props }: PowerProps) => {
    return <ContainerPower {...props} size={4} stroke={10}>{value}</ContainerPower>
}