import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { playerColors } from '@gamepark/architects-of-amytis/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { range } from 'lodash'
import PlayerBoard from '../images/boards/PlayerBoard.jpg'
import { PlayerBoardHelp } from './help/PlayerBoardHelp'

class PlayerBoardDescription extends BoardDescription {
  width = 20
  height = 20
  image = PlayerBoard

  help = PlayerBoardHelp

  staticItems = playerColors.map(player => ({
    location: {
      type: LocationType.PlayerBoardSpot,
      player
    }
  }))

  getLocations(item: MaterialItem) {
    return range(0, 3).flatMap(x => range(0, 3).map(y => ({ type: LocationType.PlayerBoardStackSpace, player: item.location.player, x, y })))
  }
}

export const playerBoardDescription = new PlayerBoardDescription()