import { LocationProps } from '@components/location'
import { Limón, Mandarina, Mango, Melón, Piña, Plátano, Sandía, Uvas } from './card.mocks'

export const locationObellaNegraMock: LocationProps = {
    id: 'obella_negra',
    name: 'Obella Negra',
    playerCards: [Mandarina, Piña, Sandía],
    oponentCards: [],

    playerPower: 0,
    oponentPower: 0,

    description: 'A partir de turno 3 no se pueden jugar cartas'
}

export const locationRazzMock: LocationProps = {
    id: 'razzmatazz',
    name: 'Razzmatazz',
    playerCards: [Mango],
    oponentCards: [Plátano],

    playerPower: 0,
    oponentPower: 0,

    description: ''
}

export const locationChurreriaMartosMock: LocationProps = {
    id: 'churreria_martos',
    name: 'Churreria Martos',
    playerCards: [Uvas, Melón],
    oponentCards: [Limón],

    playerPower: 0,
    oponentPower: 0,

    description: 'Solo puedes poner cartas en turno 6'
}

export const locationsMock = [locationObellaNegraMock, locationRazzMock, locationChurreriaMartosMock]
