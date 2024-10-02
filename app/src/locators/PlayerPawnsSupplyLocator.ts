import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerPawnsSupplyLocator extends PileLocator {
  radius = 1.5

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    switch(playerIndex) {
      case 0:
        return { x: -10, y: 16}
      case 1:
        return { x: 10, y: -16}
      default:
        return { x: 0, y: 0}
    }
  }
}

export const playerPawnsSupply = new PlayerPawnsSupplyLocator()