import { SubtitleProps } from "./subtitle.interface"
import { ContainerSubtitle } from "./subtitle.styles"

export const Subtitle = ({ children, ...props }: SubtitleProps) => {
    return <ContainerSubtitle {...props}>subtitle</ContainerSubtitle>
}