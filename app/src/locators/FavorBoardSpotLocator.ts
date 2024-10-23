import { Locator } from '@gamepark/react-game'
import { favorBoardDescription } from '../material/FavorBoardDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'

class FavorBoardSpotLocator extends Locator {
  coordinates = {
    x: mainBoardDescription.width + 2,
    y: favorBoardDescription.height / 2 + 1
  }
}

export const favorBoardSpotLocator = new FavorBoardSpotLocator()