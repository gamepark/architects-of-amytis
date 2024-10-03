import { Locator } from '@gamepark/react-game'

class MainBoardSpotLocator extends Locator {
  getCoordinates() {
    return { x: 0, y: -4}
  }  
}

export const mainBoardSpotLocator = new MainBoardSpotLocator()