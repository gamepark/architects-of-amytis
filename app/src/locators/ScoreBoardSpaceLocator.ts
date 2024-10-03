import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ScoreBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.ScoreBoard

  getPositionOnParent(location: Location) {
    return this.positions[location.x!] ?? this.positionOnParent
  }

  positions = [
    { x: 7, y: 11 }
  ]
}

export const scoreBoardSpaceLocator = new ScoreBoardSpaceLocator()