import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { BoardDescription, ItemContext } from '@gamepark/react-game'
import ScoreBoard from '../images/boards/ScoreBoard.jpg'
import { MaterialItem, Location } from '@gamepark/rules-api'
import { range } from 'lodash'

class ScoreBoardDescription extends BoardDescription {
  width = 20
  height = 9
  image = ScoreBoard

  staticItem = { location: { type: LocationType.ScoreBoardSpot } }

  getLocations(_item: MaterialItem<number, number>, _context: ItemContext<number, number, number>): Location<number, number>[] {
    return range(0,50).map(x => ({type: LocationType.ScoreBoardSpace, x: x}))  
  }
}

export const scoreBoardDescription = new ScoreBoardDescription()