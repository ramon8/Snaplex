import { Game, User } from "@types";

export interface GameRoom {
    id: string;
    game: Game;
    users: User[];
}