import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerBoardDescription } from '../material/PlayerBoardDescription'

class ScoreRangeAreaSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerBoard

  getParentItem(location: Location) {
    return playerBoardDescription.staticItems.find(item => item.location.player === location.player)
  }

  getPositionOnParent(location: Location) {
    return this.positions[location.x!] ?? this.positionOnParent
  }

  positions = [
    { x: 7.5, y: 33 },
    { x: 7.5, y: 44 },
    { x: 7.5, y: 55 },
    { x: 7.5, y: 66 }
  ]
}

export const scoreRangeAreaSpaceLocator = new ScoreRangeAreaSpaceLocator()