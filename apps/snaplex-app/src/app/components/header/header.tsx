import { Profile } from "@components"
import { RootState } from "@store/index"
import { useSelector } from "react-redux"
import { HeaderProps } from "./header.interface"
import { ContainerHeader } from "./header.styles"

export const Header = (props: HeaderProps) => {
  const oponent = 'oponent'
  const player = useSelector((state: RootState) => state.player.id);
  return <ContainerHeader>
    <Profile name={player} />
    <Profile name={oponent} />
  </ContainerHeader>
}
