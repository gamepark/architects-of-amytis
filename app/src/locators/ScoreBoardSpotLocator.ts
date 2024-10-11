import { Locator } from '@gamepark/react-game'
import { mainBoardSpotLocator } from './MainBoardSpotLocator'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { scoreBoardDescription } from '../material/ScoreBoardDescription'

class ScoreBoardSpotLocator extends Locator {
  getCoordinates() {
    return { 
      x: mainBoardSpotLocator.getCoordinates().x + mainBoardDescription.width + 1.5,
      y: mainBoardSpotLocator.getCoordinates().y - mainBoardDescription.height / 2 + scoreBoardDescription.height / 2
    }
  }
}

export const scoreBoardSpotLocator = new ScoreBoardSpotLocator()