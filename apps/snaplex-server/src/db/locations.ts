import { Site } from "@types"
import { createSite } from "../initializers/site.initializer";


export const siteObellaNegraMock: Site = createSite({
  id: 'ovella_negra',
  name: 'La Ovella Negra',
  description: 'A partir de turno 3 no se pueden jugar cartas'
}
);
export const siteRazzMock: Site = createSite({
  id: 'razzmatazz',
  name: 'Razz',
  description: ''
})

export const siteChurreriaMartosMock: Site = createSite({
  id: 'churreria_martos',
  name: 'Churreria Martos',
  description: 'Solo puedes poner cartas en turno 6'
})

export const sitesMock = [siteRazzMock, siteObellaNegraMock, siteChurreriaMartosMock]
