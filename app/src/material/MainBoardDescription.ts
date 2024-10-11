import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import MainBoard from '../images/boards/MainBoard.jpg'

class MainBoardDescription extends BoardDescription {
  width = 20
  height = 20
  image = MainBoard

  staticItem = { location: { type: LocationType.MainBoardSpot } }
}

export const mainBoardDescription = new MainBoardDescription()