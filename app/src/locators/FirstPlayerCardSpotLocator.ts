import { getRelativePlayerIndex, ItemContext, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class FirstPlayerCardSpotLocator extends Locator {
  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? { x: 12, y: 26 } : { x: 12, y: -26 }
  }
}

export const firstPlayerCardSpotLocator = new FirstPlayerCardSpotLocator()