import { Instance } from "./Instance";

export interface Card extends Instance {
    cost: number;
    power: number;
    description?: string;
    icon?: any;
}