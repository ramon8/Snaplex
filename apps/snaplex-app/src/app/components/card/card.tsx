import { RootState } from "@store/index"
import { gameActions, playerActions } from "@store/slices"
import { actionsActions } from "@store/slices/actions/actionsSlice"
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
    const location: LocationProps = { ...locations?.find((location: LocationProps) => location.id === locationId) } as LocationProps;
    if (location && cost <= mana && location.playerCards?.length < 4) {

      // The dragged card is not added to the list yet so we need to merge the actual list with the card
      // eslint-disable-next-line no-unsafe-optional-chaining
      const powerArray = [...location?.playerCards, props].map((card: CardProps) => card.power) || [];
      const power = powerArray.reduce((a: number, b: number) => a + b, 0);

      location.playerPower = power;
      location.playerCards = [...location.playerCards, props]

      const cards = [...hand];
      cards.splice(hand.findIndex((card: CardProps) => card.id === id), 1);
      console.log({ location })
      if (location) {
        dispatch(gameActions.setLocation({ location: location }))
        dispatch(playerActions.setHand({ hand: cards }))
        dispatch(playerActions.setMana({ mana: mana - cost }))


        dispatch(actionsActions.setAction({
          action: {
            card: props,
            id: location.id,
            type: 'play',
          }
        }))
      }
    }
    // dispatch(setCardDragging({ card: null }))
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
