import { getRelativePlayerIndex, ItemContext, ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerArchitectsSupplyLocator extends ListLocator {
  gap = { x: 1.5 }

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? { x: 13, y: 16 } : { x: 13, y: -16 }
  }
}

export const playerArchitectsSupplyLocator = new PlayerArchitectsSupplyLocator()