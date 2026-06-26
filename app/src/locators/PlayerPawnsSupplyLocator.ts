import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerPawnsSupplyLocator extends ListLocator {
  gap = { x: 1.8 }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return {
      x: -1,
      y: player === location.player ? 11.6 : -11.6,
      z: 1
    }
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    return { player: context.player ?? context.rules.players[0] }
  }
}

export const playerPawnsSupplyLocator = new PlayerPawnsSupplyLocator()