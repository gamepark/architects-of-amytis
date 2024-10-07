import { BoardDescription } from '@gamepark/react-game'
import PlayerBoard from '../images/boards/PlayerBoard.jpg'
import { playerColors } from '@gamepark/architects-of-amytis/PlayerColor'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'

class PlayerBoardDescription extends BoardDescription {
  width = 18
  height = 18
  image = PlayerBoard

  staticItems = playerColors.map(player => ({
    location: {
      type: LocationType.PlayerBoardSpot,
      player
    }
  }))
}

export const playerBoardDescription = new PlayerBoardDescription()