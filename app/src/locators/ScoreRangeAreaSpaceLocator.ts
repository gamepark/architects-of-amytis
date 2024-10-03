import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class ScoreRangeAreaSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerBoard

  getPositionOnParent(location: Location) {
    return { x: 1 + location.x! * 10, y: 5 + location.y! * 10 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y } = super.getItemCoordinates(item, context)
    return { x: x!, y: y! }
  }
}

export const scoreRangeAreaSpaceLocator = new ScoreRangeAreaSpaceLocator()