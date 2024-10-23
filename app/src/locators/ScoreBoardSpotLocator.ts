import { Locator } from '@gamepark/react-game'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { scoreBoardDescription } from '../material/ScoreBoardDescription'

class ScoreBoardSpotLocator extends Locator {
  coordinates = {
    x: mainBoardDescription.width + 2,
    y: -scoreBoardDescription.height / 2 - 1
  }
}

export const scoreBoardSpotLocator = new ScoreBoardSpotLocator()