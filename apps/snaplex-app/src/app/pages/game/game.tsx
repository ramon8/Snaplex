import { Footer, Header, Main } from "@components"
import { io } from "socket.io-client"
import { GameProps } from "./game.interface"
import { ContainerGame } from "./game.styles"

const socket = io("http://localhost:3000");

export const Game = (props: GameProps) => {

    return <ContainerGame {...props}>
        <Header />
        <Main />
        <Footer />
    </ContainerGame >
}