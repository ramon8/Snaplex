import { CardDetailProps } from "../cardDetail";

export interface CardSmallProps extends CardDetailProps {
    onClick?: (...args: any) => void
    rotation?: number
}