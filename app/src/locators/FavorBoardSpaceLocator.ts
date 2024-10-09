import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class FavorBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.FavorBoard

  getPositionOnParent(location: Location) {
    return this.positions[location.x!] ?? this.positionOnParent
  }

  positions = [
    { x: 10, y: 50 },
    { x: 23, y: 50 },
    { x: 36, y: 50 }
  ]
}

export const favorBoardSpaceLocator = new FavorBoardSpaceLocator()