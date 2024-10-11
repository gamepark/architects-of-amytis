import { getRelativePlayerIndex, ItemContext, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerBoardSpotLocator extends Locator {
  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? { y: 24 } : { y: -20 }
  }
}

export const playerBoardSpotLocator = new PlayerBoardSpotLocator()