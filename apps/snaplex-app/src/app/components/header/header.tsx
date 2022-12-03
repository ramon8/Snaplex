import { Profile } from "@components"
import { RootState } from "@store/index"
import { useSelector } from "react-redux"
import { HeaderProps } from "./header.interface"
import { ContainerHeader } from "./header.styles"

export const Header = (props: HeaderProps) => {
    const oponent = useSelector((state: RootState) => state.game.oponent);
    const player = useSelector((state: RootState) => state.game.player);
    return <ContainerHeader>
        <Profile name={player} />
        <Profile name={oponent} />
    </ContainerHeader>
}