import { SiteProps } from "@components/site";
import { RootState } from "@store";
import { gameActions, playerActions } from "@store/slices";
import { playgroundActions } from "@store/slices/playground/playgroundSlice";
import { Card as CardI } from "@types";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { CardProps } from "./card.interface";
import { ContainerCard, ContainerCardDetail, Icon, ManaValueStyled, Name, PowerStyled } from "./card.styles";
import { CardDetail, CardDetailProps } from "./cardDetail";


export const Card = (props: CardProps) => {
    const { id, icon, name, power, cost } = props;
    const {
        game: { sites, ...game },
        player: { mana, hand, actions, ...player },
        playground: { selectedCard }
    } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const onDragEnd = (e: any) => {
        const siteId = document.elementsFromPoint(e.clientX, e.clientY).find((elem: any) => elem?.attributes['data-id'])?.attributes['data-id' as any]?.value;
        const site: SiteProps = { ...sites?.find((site: SiteProps) => site.id === siteId) } as SiteProps;
        if (site && cost <= mana && site.playerCards?.length < 4) {

            // The dragged card is not added to the list yet so we need to merge the actual list with the card
            const powerArray = [...site?.playerCards, props].map((card: CardI) => card.power) || [];
            const power = powerArray.reduce((a: number, b: number) => a + b, 0);

            site.playerPower = power;
            site.playerCards = [...site.playerCards, props] as CardI[]

            const cards = [...hand];
            cards.splice(hand.findIndex((card: CardI) => card.id === id), 1);

            const newSites = [...sites];
            const siteIndex = newSites.findIndex(site => site.id === siteId)
            newSites[siteIndex] = site;

            if (site) {
                dispatch(gameActions.setGame({
                    game: { ...game, sites: newSites }
                }))
                dispatch(playerActions.setPlayer({
                    player: {
                        ...player,
                        hand: cards,
                        mana: mana - cost,
                        actions: [...actions, {
                            card: props,
                            locationId: site.id,
                            type: 'play',
                            id: ''
                        }]
                    }
                }));
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
            onClick={() => id && dispatch(playgroundActions.setPlayground({ playground: { selectedCard: id } }))}
            {...props}>

            <ManaValueStyled size={1} stroke={1}>{cost}</ManaValueStyled>
            <PowerStyled size={1} stroke={1}>{power}</PowerStyled>
            <Icon size={3} stroke={0}>{icon}</Icon>
            <Name size={.7} stroke={.7}>{name}</Name>
            {/* <Description size={.5}>Succión Automática</Description> */}
        </ContainerCard>
        <AnimatePresence>
            {selectedCard === id && (
                <ContainerCardDetail onClick={() => dispatch(playgroundActions.setPlayground({ playground: { selectedCard: undefined } }))}>
                    <CardDetail {...props as CardDetailProps} />
                </ContainerCardDetail>
            )}
        </AnimatePresence>
    </>
}