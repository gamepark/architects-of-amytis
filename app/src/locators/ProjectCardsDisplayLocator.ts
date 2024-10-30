import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { buildingCardDescription } from '../material/BuildingCardDescription'
import { projectCardsDeckLocator } from './ProjectCardsDeckLocator'
import { Location } from '@gamepark/rules-api'


class ProjectCardsDisplayLocator extends ListLocator {
  gap = { x: buildingCardDescription.width + 1 }
  coordinates = { x: projectCardsDeckLocator.coordinates.x + this.gap.x }
  getHoverTransform = () => ['translateZ(10em)', 'scale(2)']

  getRotateZ(location: Location<number, number>, _context: MaterialContext<number, number, number>): number {
    return location.rotation
  }
}

export const projectCardsDisplayLocator = new ProjectCardsDisplayLocator()