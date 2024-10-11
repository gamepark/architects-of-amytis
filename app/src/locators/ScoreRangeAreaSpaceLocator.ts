import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerBoardDescription } from '../material/PlayerBoardDescription'

class ScoreRangeAreaSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerBoard

  getParentItem(location: Location) {
    return playerBoardDescription.staticItems.find(item => item.location.player === location.player)
  }

  getPositionOnParent() {
    return { x: 7, y: 33 }
  }
}

export const scoreRangeAreaSpaceLocator = new ScoreRangeAreaSpaceLocator()