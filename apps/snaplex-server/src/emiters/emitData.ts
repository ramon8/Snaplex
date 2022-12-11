import { GameRoom, EmitData, Site } from "@types";

export const emitGameData = ({ player, oponent, game: { sites, firstToReveal, ...game }, ...gameRoom }: GameRoom) => {
    const players = [player, oponent]
    const sitesArr = [sites, flipSitesData(sites)]
    players.forEach(({ id, socket, ...player }) => {
        const data: EmitData = {
            ...player,
            ...game,
            userId: id,
            sites: sitesArr[0],
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