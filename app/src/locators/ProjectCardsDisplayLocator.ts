import { ListLocator } from '@gamepark/react-game'
import { projectCardsDeckLocator } from './ProjectCardsDeckLocator'

class ProjectCardsDisplayLocator extends ListLocator {
  getCoordinates() {
    return { x: 8 + projectCardsDeckLocator.getCoordinates().x, y: projectCardsDeckLocator.getCoordinates().y }
  }

  gap = { x: 7 }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2)']
}

export const projectCardsDisplayLocator = new ProjectCardsDisplayLocator()