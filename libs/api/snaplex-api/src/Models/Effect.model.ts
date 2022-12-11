import { Entity } from "./Entity.model";

export type EffectType = 'reveal' | 'continous' | 'special' | 'none';

export interface Effect extends Entity {
    id: string
    type: EffectType
}
