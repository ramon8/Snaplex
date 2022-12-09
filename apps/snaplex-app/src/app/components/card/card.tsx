import { Button } from "@components/button";
import { RootState } from "@store";
import { playgroundActions } from "@store/slices/playground/playgroundSlice";
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { CardProps } from "./card.interface"
import { Name, Power, Mana, Description, ContainerCard, Icon, ContainerCardDetail } from "./card.styles"
import { CardDetail, CardDetailProps } from "./cardDetail";


export const Card = (props: CardProps) => {
    const { id, icon, name, power, cost } = props;
    const { selectedCard } = useSelector((state: RootState) => state.playground);
    const dispatch = useDispatch();

    return <>
        {/* <CardDetail {...props as CardDetailProps} /> */}
        <ContainerCard drag layoutId={id} dragElastic={.02} dragMomentum={false} dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }} {...props} onClick={() => id && dispatch(playgroundActions.setSelectedCard({ cardId: id }))}>
            <Mana size={1} stroke={1}>{cost}</Mana>
            <Power size={1} stroke={1}>{power}</Power>
            <Icon size={3} stroke={0}>{icon}</Icon>
            <Name size={.7} stroke={.7}>{name}</Name>
            {/* <Description size={.5}>Succión Automática</Description> */}
        </ContainerCard>
        <AnimatePresence>
            {selectedCard === id && (
                <ContainerCardDetail onClick={() => dispatch(playgroundActions.setSelectedCard({}))}>
                    <CardDetail {...props as CardDetailProps} />
                </ContainerCardDetail>
            )}
        </AnimatePresence>
    </>
}