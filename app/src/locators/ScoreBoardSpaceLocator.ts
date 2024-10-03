import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ScoreBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.ScoreBoard

  getPositionOnParent(location: Location) {
    return { x: 20 + location.x! * 1.5, y: 20 + location.y! }
  }
}

export const scoreBoardSpaceLocator = new ScoreBoardSpaceLocator()