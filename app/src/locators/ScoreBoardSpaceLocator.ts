import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ScoreBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.ScoreBoard

  getPositionOnParent(location: Location) {
    return this.positions[location.x!] ?? this.positionOnParent
  }

  // TODO: Update. Just for testing
  positions = [
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 }
  ]
}

export const scoreBoardSpaceLocator = new ScoreBoardSpaceLocator()