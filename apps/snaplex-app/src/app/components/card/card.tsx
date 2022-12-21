import { RootState } from "@store";
import { gameActions } from "@store/slices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CardProps } from "./card.interface"
import { ContainerCard } from "./card.styles"

export const Card = ({ ...props }: CardProps) => {
  const [found, setFound] = useState('');

  const dispatch = useDispatch();

  const onDrag = (e: any) => {
    const slotId = document.elementsFromPoint(e.clientX, e.clientY).find((elem: any) => elem?.attributes['data-id'])?.attributes['data-id' as any]?.value;
    if (slotId && slotId != found) setFound(slotId);
    else if (!slotId) setFound('')
  }

  useEffect(() => {
    found && dispatch(gameActions.addNewPlayersFigure({ figure: { id: '100', value: 100, temporal: true }, index: +found }));
    !found && dispatch(gameActions.removeTemporalPlayerFigure());
  }, [found]);

  return <ContainerCard
    drag
    dragElastic={1}
    dragMomentum={false}
    dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
    onDrag={onDrag}
    {...props}>
    card
  </ContainerCard >
}
/**
 * const onDragEnd = (e: any) => {
    const siteId = document.elementsFromPoint(e.clientX, e.clientY).find((elem: any) => elem?.attributes['data-id'])?.attributes['data-id' as any]?.value;
    const site: SiteProps = { ...sites?.find((site: SiteProps) => site.id === siteId) } as SiteProps;
    if (site && cost <= mana && site.playerCards?.length < 4) {
      // The dragged card is not added to the list yet so we need to merge the actual list with the card
      const powerArray = [...site.playerCards, props].map((card: CardI) => card.power) || [];
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
    dispatch(playgroundActions.setPlayground({ playground: { ...playground, hoveredSite: undefined, draggingCard: undefined } }))
  }
 */