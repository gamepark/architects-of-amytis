import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { mainBoardDescription } from '../material/MainBoardDescription'

class ProjectCardsDeckLocator extends Locator {
  getCoordinates() {
    return { 
      x: -39,
      y: mainBoardDescription.height / 2 - 3.5
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y } = super.getItemCoordinates(item, context)
    return { x: x! - item.location.x! * 0.05, y: y! - item.location.x! * 0.05 }
  }

  // getHoverTransform = () => ['translateZ(10em)', 'scale(2)']
}

export const projectCardsDeckLocator = new ProjectCardsDeckLocator()