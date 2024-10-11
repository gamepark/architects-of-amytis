import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class FavorBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.FavorBoard

  getPositionOnParent(location: Location) {
    return this.positions[location.x!] ?? this.positionOnParent
  }

  positions = [
    { x: 8, y: 49 },
    { x: 22, y: 49 },
    { x: 36, y: 49 },
    { x: 50, y: 49 },
    { x: 64, y: 49 },
    { x: 78, y: 49 },
    { x: 92, y: 49 },
    { x: 45, y: 82.5 },
    { x: 54.5, y: 82.5 },
    { x: 64, y: 82.5 },
    { x: 73, y: 82.5 },
    { x: 82.5, y: 82.5 },
    { x: 92, y: 82.5 },
  ]
}

export const favorBoardSpaceLocator = new FavorBoardSpaceLocator()