import { Button } from "@components/button";
import { RootState } from "@store";
import { playgroundActions } from "@store/slices/playground/playgroundSlice";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../card.styles";
import { CardDetailProps } from "./cardDetail.interface"
import { ContainerCardDetail } from "./cardDetail.styles"
import { Mana, Power, Name, Description } from './cardDetail.styles'


export const CardDetail = ({ id, icon, name, power, cost, description, ...props }: CardDetailProps) => {
    const dispatch = useDispatch();
    return <>
        <ContainerCardDetail drag layoutId={id} dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }} {...props}>
            <Mana size={4} stroke={2}>{cost}</Mana>
            <Power size={4} stroke={2}>{power}</Power>
            <Name size={3.2} stroke={2}>{name}</Name>
            <Icon size={15} stroke={2}>{icon}</Icon>
            <Description size={1.2}>{description}</Description>
            {/* <Button value="Close" onClick={() => dispatch(playgroundActions.setSelectedCard({}))} /> */}
        </ContainerCardDetail>
    </>
}