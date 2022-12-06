import { RootState } from "@store/index"
import { gameActions, playerActions } from "@store/slices"
import { useDispatch, useSelector } from "react-redux"
import { LocationProps } from ".."
import { CardProps } from "./card.interface"
import { ContainerCard, Name, Icon, Description, StyledPower, StyledMana } from "./card.styles"

const staticProps = {
    dragConstraints: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    dragElastic: 1,
    dragMomentum: false
}

export const Card = (props: CardProps) => {
    const { id, name, cost, power, description, icon, drag = false, type = 'hand' } = props;

    const locations = useSelector((state: RootState) => state.game.locations)
    const { mana, hand } = useSelector((state: RootState) => state.player)

    const dispatch = useDispatch();

    const onDragEnd = (e: any) => {
        const locationId = document.elementsFromPoint(e.clientX, e.clientY).find((elem: any) => elem?.attributes['data-id'])?.attributes['data-id' as any]?.value;
        const location: LocationProps = locations?.find((location: LocationProps) => location.id === locationId) as LocationProps;
        const { playersCards: [playerCards] } = location;
        if (location && cost <= mana && playerCards?.length < 4) {

            // The dragged card is not added to the list yet so we need to merge the actual list with the card
            const powerArray = [...playerCards, props].map((card: CardProps) => card.power) || [];
            const power = powerArray.reduce((a: number, b: number) => a + b, 0);

            const localLocation: LocationProps = {
                ...location,
                playersPower: [power, location.playersPower[1]],
                playersCards: [[...playerCards, props], location.playersCards[1]]
            }

            const cards = [...hand];
            cards.splice(hand.findIndex((card: CardProps) => card.id === id), 1);

            if (location) {
                dispatch(gameActions.setLocation({ location: localLocation }))
                dispatch(playerActions.setHand({ hand: cards }))
                dispatch(playerActions.setMana({ mana: mana - cost }))
            }
        }
    }
    return <ContainerCard
        {...staticProps}
        drag={type === 'hand'}
        data-type={type}
        onDragEnd={onDragEnd}
        layoutId={id}
    >
        {type !== 'location' && <Name>{name}</Name>}
        <StyledPower value={power} />
        <Icon data-type={type}>{icon}</Icon>
        {/* {type === 'detail' && <Description>{description}</Description>} */}
        {type !== 'location' && <StyledMana value={cost} />}
    </ContainerCard>
}