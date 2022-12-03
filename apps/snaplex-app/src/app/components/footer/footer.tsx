import { Mana } from "@components/mana"
import { RootState } from "@store/index"
import { useSelector } from "react-redux"
import { FooterProps } from "./footer.interface"
import { ContainerFooter, ManaStyled, ButtonStyled, HandStyled } from "./footer.styles"

export const Footer = (props: FooterProps) => {
    const mana = useSelector((state: RootState) => state.player.mana);
    return <ContainerFooter  {...props}>
        <ManaStyled value={mana} />
        <ButtonStyled />
        <HandStyled />
    </ContainerFooter>
}