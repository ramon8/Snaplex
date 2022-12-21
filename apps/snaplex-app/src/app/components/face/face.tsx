import { FaceProps } from "./face.interface"
import { ContainerFace } from "./face.styles"

export const Face = ({ ...props }: FaceProps) => {
    return <ContainerFace {...props}>

    </ContainerFace>
}