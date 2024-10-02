import { getRelativePlayerIndex, ItemContext, ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerArchitectsSupplyLocator extends ListLocator {
  gap = { x: 1, y: 0 }

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    switch(playerIndex) {
      case 0:
        return { x: -16, y: 16 }
      case 1:
        return { x: 12, y: -16 }
      default:
        return { x: 0, y: 0 }
    }
  }
}

export const playerArchitectsSupply = new PlayerArchitectsSupplyLocator()