import { getRelativePlayerIndex, ItemContext, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerBoardSpotLocator } from './PlayerBoardSpotLocator'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { projectCardDescription } from '../material/ProjectCardDescription'

class PlayerValidatedProjectCardsPileLocator extends Locator {

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const y = playerBoardSpotLocator.getCoordinates(location, context).y - playerBoardDescription.height / 2 + projectCardDescription.height / 2
    return playerIndex === 0 ? { x: playerBoardSpotLocator.coordinates.x! + 25, y: y + 5 } : { x: playerBoardSpotLocator.coordinates.x! + 25, y: y + 5 } 
  }

}

export const playerValidatedProjectCardsPileLocator = new PlayerValidatedProjectCardsPileLocator()