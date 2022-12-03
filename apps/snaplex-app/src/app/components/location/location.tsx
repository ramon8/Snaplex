import { Card, Power } from "@components";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { LocationProps } from "./location.interface"
import { ContainerLocation, LocationCardsCotnainer, LocationInfoContainer, LocationName, LocationDescription } from "./location.styles"

export const Location = ({ playerPower, oponentPower, name, oponentCards, playerCards, description, id }: LocationProps) => {

    return <ContainerLocation>
        <LocationCardsCotnainer>
            {oponentCards?.map(card => <Card key={card.id} {...card} type="location" />)}
        </LocationCardsCotnainer>
        <LocationInfoContainer>
            <Power value={oponentPower} />
            <LocationName>{name}</LocationName>
            {/* <LocationDescription>{description}</LocationDescription> */}
            <Power value={playerPower} />
        </LocationInfoContainer>
        <LocationCardsCotnainer data-id={id}>
            {playerCards?.map(card => <Card key={card.id} {...card} type="location" />)}
        </LocationCardsCotnainer>
    </ContainerLocation>
}