import { Location } from "@types"


export const locationObellaNegraMock: Location = {
  id: 'obella_negra',
  name: 'Obella Negra',
  playersCards: [[], []],
  playersPower: [0, 0],
  description: 'A partir de turno 3 no se pueden jugar cartas'
}

export const locationRazzMock: Location = {
  id: 'razzmatazz',
  name: 'Razzmatazz',
  playersCards: [[], []],
  playersPower: [0, 0],
  description: ''
}

export const locationChurreriaMartosMock: Location = {
  id: 'churreria_martos',
  name: 'Churreria Martos',
  playersCards: [[], []],
  playersPower: [0, 0],
  description: 'Solo puedes poner cartas en turno 6'
}

export const locationsMock = [locationObellaNegraMock, locationRazzMock, locationChurreriaMartosMock]
