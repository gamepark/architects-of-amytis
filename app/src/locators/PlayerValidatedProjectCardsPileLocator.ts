import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerValidatedProjectCardsPileLocator extends DeckLocator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return {
      x: 2.5,
      y: player === location.player ? 16 : -16
    }
  }
}

export const playerValidatedProjectCardsPileLocator = new PlayerValidatedProjectCardsPileLocator()