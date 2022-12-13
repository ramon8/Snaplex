import { TextProps } from "./text.interface"
import { ContainerText } from "./text.styles"

export const Text = ({ children, shouldAnimate = false, size = 2, stroke = 1, bottomShadow = 0, ...props }: TextProps) => {
    return <ContainerText
        key={children}
        animate={shouldAnimate && {
            scale: [null, 1.2, 1],
        }}
        transition={{ duration: 0.1 }} {...props} bottomShadow={bottomShadow} size={size} stroke={stroke}>{children}</ContainerText>
}