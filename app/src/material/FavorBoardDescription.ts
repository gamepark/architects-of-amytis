import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import FavorBoard from '../images/boards/FavorBoard.jpg'

class FavorBoardDescription extends BoardDescription {
  width = 20
  height = 9
  image = FavorBoard

  staticItem = { location: { type: LocationType.FavorBoardSpot } }
}

export const favorBoardDescription = new FavorBoardDescription()