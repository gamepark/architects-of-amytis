import { BoardDescription } from '@gamepark/react-game'
import PlayerBoard from '../images/boards/PlayerBoard.jpg'
import { playerColors } from '@gamepark/architects-of-amytis/PlayerColor'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'

class PlayerBoardDescription extends BoardDescription {
  width = 20
  height = 20
  image = PlayerBoard

  staticItems = playerColors.map(player => ({
    location: {
      type: LocationType.PlayerBoardSpot,
      player
    }
  }))
}

export const playerBoardDescription = new PlayerBoardDescription()