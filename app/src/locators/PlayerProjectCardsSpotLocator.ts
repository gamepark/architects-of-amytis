import { FlexLocator, getRelativePlayerIndex, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerBoardSpotLocator } from './PlayerBoardSpotLocator'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { projectCardDescription } from '../material/ProjectCardDescription'

class PlayerProjectCardsSpotLocator extends FlexLocator {
  gap = { x: -7 }
  lineSize = 5
  lineGap = { y: -7 }

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const y = playerBoardSpotLocator.getCoordinates(location, context).y - playerBoardDescription.height / 2 + projectCardDescription.height / 2
    return playerIndex === 0 ? { x: playerBoardSpotLocator.coordinates.x! - 15, y: y } : { x: playerBoardSpotLocator.coordinates.x! - 15, y: y } 
  }

}

export const playerProjectCardsSpotLocator = new PlayerProjectCardsSpotLocator()