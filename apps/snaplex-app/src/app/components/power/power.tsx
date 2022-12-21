import { PowerProps } from "./power.interface"
import { ContainerPower } from "./power.styles"

export const Power = ({ ...props }: PowerProps) => {
    return <ContainerPower {...props}>power</ContainerPower>
}