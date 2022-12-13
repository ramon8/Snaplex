
export type TimerType = 'danger' | 'default';

export interface TimerProps {
    disabled?: boolean;
    type?: TimerType;
    value: number;
    max: number;
}