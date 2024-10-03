import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerPawnsSupplyLocator extends PileLocator {
  radius = 1.5

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? { x: 10, y: 16 } : { x: 10, y: -16 }
  }
}

export const playerPawnsSupplyLocator = new PlayerPawnsSupplyLocator()