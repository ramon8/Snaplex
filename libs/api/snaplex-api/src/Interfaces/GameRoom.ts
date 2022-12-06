import { Game } from "./Game";
import { Instance } from "./Instance";
import { User } from "./User";

export interface GameRoom extends Instance {
    users: User[]
    game: Game
}