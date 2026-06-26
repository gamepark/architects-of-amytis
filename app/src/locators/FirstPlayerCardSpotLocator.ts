import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { firstPlayerCardDescription } from '../material/FirstPlayerCardDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'

class FirstPlayerCardSpotLocator extends Locator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return {
      x: -mainBoardDescription.width / 2 + firstPlayerCardDescription.width / 2,
      y: player === location.player ? 16 : -16
    }
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    return { player: context.player ?? context.rules.players[0] }
  }
}

export const firstPlayerCardSpotLocator = new FirstPlayerCardSpotLocator()