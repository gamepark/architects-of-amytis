// import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
// import { ItemContext, Locator } from '@gamepark/react-game'
// import { Location, MaterialItem } from '@gamepark/rules-api'
// import { Location } from '@gamepark/rules-api'
// import { MaterialItem } from '@gamepark/rules-api'
import { ItemContext, Locator } from '@gamepark/react-game'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { projectCardDescription } from '../material/ProjectCardDescription'
import { MaterialItem } from '@gamepark/rules-api'

class ProjectCardsDeck extends Locator {
  getCoordinates() {
    return { 
      x: -mainBoardDescription.width / 2 + projectCardDescription.width / 2,
      y: mainBoardDescription.height / 2 + projectCardDescription.height / 2 + 2
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y } = super.getItemCoordinates(item, context)
    return { x: x! - item.location.x! * 0.05, y: y! - item.location.x! * 0.05 }
  }

  // getHoverTransform = () => ['translateZ(10em)', 'scale(2)']

  // isFlippedOnTable(): boolean {
  //   return true
  // }
}

export const projectCardsDeck = new ProjectCardsDeck()