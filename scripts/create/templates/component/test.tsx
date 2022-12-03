import { TestProps } from "./test.interface"
import { ContainerTest } from "./test.styles"

export const Test = ({ ...props }: TestProps) => {
    return <ContainerTest {...props}>test</ContainerTest>
}