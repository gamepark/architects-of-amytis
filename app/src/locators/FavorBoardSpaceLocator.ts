import { FavorType } from '@gamepark/architects-of-amytis/material/FavorType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class FavorBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.FavorBoard

  getPositionOnParent(location: Location) {
    if (location.id === FavorType.PawnsInBottomRow) {
      return { x: 45 + location.x! * 9.4, y: 82.5 }
    } else {
      return { x: 8 + location.id * 14, y: 49 }
    }
  }

  locationDescription = new DropAreaDescription({ width: 1.7, height: 1.7, borderRadius: 1 })
}

export const favorBoardSpaceLocator = new FavorBoardSpaceLocator()