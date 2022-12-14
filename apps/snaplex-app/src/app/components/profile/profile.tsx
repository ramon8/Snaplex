import { ProfileProps } from "./profile.interface"
import { ContainerProfile } from "./profile.styles"

export const Profile = ({ name }: ProfileProps) => {
    return <ContainerProfile size={5} stroke={10}>{name}</ContainerProfile>
}