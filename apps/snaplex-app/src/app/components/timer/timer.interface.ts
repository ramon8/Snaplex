
export type TimerType = 'danger' | 'default';

export interface TimerProps {
    disabled?: boolean;
    type?: TimerType;
    delay?: string;
    shouldAnimate?: boolean;
}