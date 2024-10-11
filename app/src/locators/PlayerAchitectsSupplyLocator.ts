import { getRelativePlayerIndex, ItemContext, ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerArchitectsSupplyLocator extends ListLocator {
  gap = { x: -2.5 }

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? { x: -17, y: 24 } : { x: -17, y: -20 }
  }
}

export const playerArchitectsSupplyLocator = new PlayerArchitectsSupplyLocator()