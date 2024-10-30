import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import MainBoard from '../images/boards/MainBoard.jpg'
import { range } from 'lodash'

class MainBoardDescription extends BoardDescription {
  width = 20
  height = 20
  image = MainBoard

  staticItem = { location: { type: LocationType.MainBoardSpot } }

  getLocations() {
    return range(0, 3).flatMap(x => range(0, 3).map(y => ({ type: LocationType.MainBoardStackSpace, x, y })))
  }
}

export const mainBoardDescription = new MainBoardDescription()