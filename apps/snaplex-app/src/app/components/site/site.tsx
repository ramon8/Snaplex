import { Card, Power } from "@components";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { SiteProps } from "./site.interface"
import { ContainerSite, SiteCardsCotnainer, SiteInfoContainer, SiteName, SiteDescription } from "./site.styles"

export const Site = ({ playerPower, oponentPower, name, oponentCards, playerCards, description, id }: SiteProps) => {

    return <ContainerSite>

        <SiteCardsCotnainer>
            {oponentCards?.map(card => <Card key={card.id} {...card} />)}
        </SiteCardsCotnainer>

        <SiteInfoContainer>
            <Power value={oponentPower} />
            <SiteName>{name}</SiteName>
            {/* <SiteDescription>{description}</SiteDescription> */}
            <Power value={playerPower} />
        </SiteInfoContainer>

        <SiteCardsCotnainer data-id={id}>
            {playerCards?.map(card => <Card key={card.id} {...card} />)}
        </SiteCardsCotnainer>

    </ContainerSite>
}