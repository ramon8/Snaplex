import { Card } from "@components";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { SiteProps } from "./site.interface"
import { ContainerSite, SiteCardsCotnainer, SiteInfoContainer, SiteName, StyledOponentPower, StyledPlayerPower } from "./site.styles"

export const Site = ({ playerPower, oponentPower, name, oponentCards, playerCards, id }: SiteProps) => {

    const isPlayerWinning = playerPower > oponentPower;

    return <ContainerSite>
        <SiteCardsCotnainer>
            {oponentCards?.map(card => <Card type="small" key={card.id} {...card} />)}
        </SiteCardsCotnainer>
        <SiteInfoContainer>
            <StyledOponentPower color={!isPlayerWinning && playerPower != oponentPower ? "#EEC408" : ''} shouldAnimate stroke={10}>{oponentPower}</StyledOponentPower>
            <SiteName size={1} stroke={8} bottomShadow={3}>{name}</SiteName>
            <StyledPlayerPower color={isPlayerWinning ? "#EEC408" : ''} shouldAnimate stroke={10}>{playerPower}</StyledPlayerPower>
        </SiteInfoContainer>
        <SiteCardsCotnainer data-id={id}>
            {playerCards?.map(card => <Card type="small" key={card.id} {...card} />)}
        </SiteCardsCotnainer>
    </ContainerSite >
}