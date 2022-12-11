import { GameRoom, EmitData, Site } from "@types";


export const emitGameData = ({ player, oponent, game: { sites, firstToReveal, ...game } }: GameRoom) => {
    const players = [player, oponent]
    const sitesArr = [sites, flipSitesData(sites)]
    players.forEach(({ id, socket, ...player }, i) => {
        const data: EmitData = {
            ...player,
            ...game,
            userId: id,
            sites: sitesArr[i],
            turnStartedAt: 0,
            isfirstToReveal: id === firstToReveal,
        };
        socket && socket.emit("START_GAME", data)
    })
}

export const flipSitesData = (sites: Site[]): Site[] => [...sites].map(
    ({ playerCards, playerPower, oponentCards, oponentPower, ...site }) => ({
        ...site,
        playerCards: oponentCards,
        playerPower: oponentPower,
        oponentCards: playerCards,
        oponentPower: playerPower,
    }))