import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import ScoreBoard from '../images/boards/ScoreBoard.jpg'

class ScoreBoardDescription extends BoardDescription {
  width = 15
  height = 7
  image = ScoreBoard

  staticItem = { location: { type: LocationType.ScoreBoardSpot } }
}

export const scoreBoardDescription = new ScoreBoardDescription()