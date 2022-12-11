import { LocationProps } from "@components/location";
import { RootState } from "@store";
import { gameActions, playerActions } from "@store/slices";
import { actionsActions } from "@store/slices/actions/actionsSlice";
import { playgroundActions } from "@store/slices/playground/playgroundSlice";
import { Card as CardI } from "@types";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { CardProps } from "./card.interface";
import { ContainerCard, ContainerCardDetail, Icon, ManaValueStyled, Name, PowerStyled } from "./card.styles";
import { CardDetail, CardDetailProps } from "./cardDetail";


export const Card = (props: CardProps) => {
    const { id, icon, name, power, cost } = props;
    const { selectedCard } = useSelector((state: RootState) => state.playground);
    const locations = useSelector((state: RootState) => state.game.locations)
    const { mana, hand } = useSelector((state: RootState) => state.player)
    const actions = useSelector((state: RootState) => state.actions)

    const dispatch = useDispatch();

    const onDragEnd = (e: any) => {
        const locationId = document.elementsFromPoint(e.clientX, e.clientY).find((elem: any) => elem?.attributes['data-id'])?.attributes['data-id' as any]?.value;
        const location: LocationProps = { ...locations?.find((location: LocationProps) => location.id === locationId) } as LocationProps;
        if (location && cost <= mana && location.playerCards?.length < 4) {

            // The dragged card is not added to the list yet so we need to merge the actual list with the card
            // eslint-disable-next-line no-unsafe-optional-chaining
            const powerArray = [...location?.playerCards, props].map((card: CardI) => card.power) || [];
            const power = powerArray.reduce((a: number, b: number) => a + b, 0);

            location.playerPower = power;
            location.playerCards = [...location.playerCards, props] as CardI[]

            const cards = [...hand];
            cards.splice(hand.findIndex((card: CardI) => card.id === id), 1);
            console.log({ location })
            if (location) {
                dispatch(gameActions.setLocation({ location: location }))
                dispatch(playerActions.setHand({ hand: cards }))
                dispatch(playerActions.setMana({ mana: mana - cost }))

                console.log({ actions });
                dispatch(actionsActions.setAction({
                    action: {
                        card: props,
                        id: location.id,
                        type: 'play',
                    }
                }))
            }
        }

    }
    return <>
        <ContainerCard
            onDragEnd={onDragEnd}
            drag
            layoutId={id}
            dragElastic={1}
            dragMomentum={false}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            onClick={() => id && dispatch(playgroundActions.setSelectedCard({ cardId: id }))}
            {...props}>

            <ManaValueStyled size={1} stroke={1}>{cost}</ManaValueStyled>
            <PowerStyled size={1} stroke={1}>{power}</PowerStyled>
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