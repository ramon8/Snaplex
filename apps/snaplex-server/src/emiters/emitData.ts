import { GameRoom, EmitData, Site } from "@types";


export const emitGameData = ({ player, oponent, game: { sites, firstToReveal, ...game } }: GameRoom) => {
  const players = [player, oponent]
  const sitesArr = [sites, flipSitesData(sites)]
  players.forEach(({ id, socket, ...updatedPlayer }, i) => {
    const data: EmitData = {
      ...updatedPlayer,
      ...game,
      userId: id,
      sites: sitesArr[i],
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
