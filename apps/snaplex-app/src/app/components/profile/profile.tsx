import { ProfileProps } from "./profile.interface"
import { ContainerProfile } from "./profile.styles"

export const Profile = ({ name }: ProfileProps) => {
    return <ContainerProfile>{name}</ContainerProfile>
}