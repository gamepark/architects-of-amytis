import { ItemContext, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { projectCardDescription } from '../material/ProjectCardDescription'

class PlayerBoardSpotLocator extends Locator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    const deltaY = playerBoardDescription.height / 2 + projectCardDescription.height / 2 + 2
    return {
      x: -playerBoardDescription.width - 2,
      y: player === location.player ? deltaY : -deltaY
    }
  }
}

export const playerBoardSpotLocator = new PlayerBoardSpotLocator()