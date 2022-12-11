import { Site } from "@types";

const initialSite: Site = {
    enabled: false,
    id: '',
    maxCards: 4,
    oponentCards: [],
    oponentPower: 0,
    playerCards: [],
    playerPower: 0,
    visible: false
}

export const createSite = (site?: Partial<Site>): Site => ({
    ...initialSite, ...site
})