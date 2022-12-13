import { EmitData, GameRoom } from "@types";
import { flipSitesData } from "./emitData";

export const emitGameDataToUser = ({ player: { socket, ...player }, oponent, game: { firstToReveal, ...game } }: GameRoom, id: string) => {
  let { sites } = game;
  if (oponent.id === id) {
    socket = oponent.socket
    sites = flipSitesData(sites);
  }
  const data: EmitData = {
    ...player,
    ...game,
    userId: id,
    sites: sites,
    isfirstToReveal: id === firstToReveal,
  };
  socket && socket.emit("START_GAME", data)
}
