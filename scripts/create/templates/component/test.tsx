import React from "react"
import { TestProps } from "./test.interface"
import { ContainerTest } from "./test.styles"

export const Test = ({ name }: TestProps) => {
    return <ContainerTest>{name}</ContainerTest>
}