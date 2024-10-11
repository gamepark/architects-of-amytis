import { Locator } from '@gamepark/react-game'

class MainBoardSpotLocator extends Locator {
  getCoordinates() {
    return { x: 0, y: 2}
  }  
}

export const mainBoardSpotLocator = new MainBoardSpotLocator()