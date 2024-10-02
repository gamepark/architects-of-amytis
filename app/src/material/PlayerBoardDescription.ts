import { BoardDescription } from '@gamepark/react-game'
import PlayerBoard from '../images/boards/PlayerBoard.jpg'
// import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'

class PlayerBoardDescription extends BoardDescription {
  width = 15
  height = 15
  image = PlayerBoard
}

export const playerBoardDescription = new PlayerBoardDescription()