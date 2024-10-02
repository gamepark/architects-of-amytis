import { getRelativePlayerIndex, ItemContext, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerBoardSpot extends Locator {
  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    switch(playerIndex) {
      case 0:
        return { x: 0, y: 22}
      case 1:
        return { x: 0, y: -22}
      default:
        return { x: 0, y: 0}
    }
  }
}

export const playerBoardSpot = new PlayerBoardSpot()