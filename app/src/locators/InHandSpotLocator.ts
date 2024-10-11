import { Locator } from '@gamepark/react-game'

class InHandSpotLocator extends Locator {
  getCoordinates() {
    return { x: -10, y: -5}
  }  
}

export const inHandSpotLocator = new InHandSpotLocator()