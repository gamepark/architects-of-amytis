import { Locator } from '@gamepark/react-game'
import { mainBoardSpotLocator } from './MainBoardSpotLocator'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { scoreBoardDescription } from '../material/ScoreBoardDescription'
import { scoreBoardSpotLocator } from './ScoreBoardSpotLocator'

class FavorBoardSpotLocator extends Locator {
  getCoordinates() {
    return { 
      x: mainBoardSpotLocator.getCoordinates().x + mainBoardDescription.width + 1,
      y: scoreBoardSpotLocator.getCoordinates().y + scoreBoardDescription.height + 1
    }
  }
}

export const favorBoardSpotLocator = new FavorBoardSpotLocator()