import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerBoardDescription } from '../material/PlayerBoardDescription'

class PlayerBoardStackSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerBoard

  getParentItem(location: Location) {
    return playerBoardDescription.staticItems.find(item => item.location.player === location.player)
  }

  getPositionOnParent(location: Location) {
    return { x: 27 + location.x! * 26, y: 26 + location.y! * 25 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z } = super.getItemCoordinates(item, context)
    return { x: x! - item.location.z! * 0.05, y: y! - item.location.z! * 0.05, z: z! + item.location.z! * 0.05 }
  }

  // getHoverTransform = () => ['translateZ(10em)', 'scale(2)']
}

export const playerBoardStackSpaceLocator = new PlayerBoardStackSpaceLocator()