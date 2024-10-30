import { ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { buildingCardDescription } from '../material/BuildingCardDescription'
import { projectCardsDeckLocator } from './ProjectCardsDeckLocator'


class ProjectCardsDisplayLocator extends ListLocator {
  gap = { x: buildingCardDescription.width + 1 }
  coordinates = { x: projectCardsDeckLocator.coordinates.x + this.gap.x }
  getHoverTransform = () => ['translateZ(10em)', 'scale(2)']

  getRotateZ(location: Location) {
    return (location.rotation ?? 0) * 90
  }
}

export const projectCardsDisplayLocator = new ProjectCardsDisplayLocator()