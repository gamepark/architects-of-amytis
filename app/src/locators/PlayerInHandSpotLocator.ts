import { getRelativePlayerIndex, ItemContext, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerInHandSpotLocator extends Locator {
  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? { y: 14 } : { y: -14 }
  }
}

export const playerInHandSpotLocator = new PlayerInHandSpotLocator()