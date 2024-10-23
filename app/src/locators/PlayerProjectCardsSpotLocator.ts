import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { projectCardDescription } from '../material/ProjectCardDescription'

class PlayerProjectCardsSpotLocator extends FlexLocator {
  gap = { y: 7.5 }
  lineSize = 2
  lineGap = { x: 7.5 }
  maxLineGap = { x: 17.5 }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    const deltaY = mainBoardDescription.height / 2 + projectCardDescription.height / 2 + 1
    return {
      x: 11,
      y: player === location.player ? deltaY : -deltaY - this.gap.y
    }
  }

}

export const playerProjectCardsSpotLocator = new PlayerProjectCardsSpotLocator()