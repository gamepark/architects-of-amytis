import { ItemContext, Locator } from '@gamepark/react-game'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { MaterialItem } from '@gamepark/rules-api'
import { mainBoardSpotLocator } from './MainBoardSpotLocator'

class ProjectCardsDeckLocator extends Locator {
  getCoordinates() {
    return { 
      x: mainBoardSpotLocator.getCoordinates().x - 39,
      y: mainBoardSpotLocator.getCoordinates().y + mainBoardDescription.height / 2 - 3.5
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y } = super.getItemCoordinates(item, context)
    return { x: x! - item.location.x! * 0.05, y: y! - item.location.x! * 0.05 }
  }

  // getHoverTransform = () => ['translateZ(10em)', 'scale(2)']
}

export const projectCardsDeckLocator = new ProjectCardsDeckLocator()