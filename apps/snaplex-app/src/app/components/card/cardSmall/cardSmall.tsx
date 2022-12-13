import { getRandomInt } from "apps/snaplex-app/utils";
import { useMemo } from "react";
import { CardSmallProps } from "./cardSmall.interface"
import { ContainerCardSmall, StyledIcon, StyledName, StyledPower } from "./cardSmall.styles"

const rotationValues: number[] = [-4, -2, 4, 2];

export const CardSmall = ({ id, power, name, icon, onClick, ...props }: CardSmallProps) => {
    const rotation = useMemo(() => rotationValues[getRandomInt(3)], [getRandomInt]);
    return <ContainerCardSmall rotation={rotation} layoutId={id} onClick={onClick} {...props}>
        <StyledPower stroke={2}>{power}</StyledPower>
        <StyledName stroke={2}>{name}</StyledName>
        <StyledIcon>{icon}</StyledIcon>
    </ContainerCardSmall>
}