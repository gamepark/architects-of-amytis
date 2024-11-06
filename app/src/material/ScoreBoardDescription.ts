import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import ScoreBoard from '../images/boards/ScoreBoard.jpg'
import { ScoreBoardHelp } from './help/ScoreBoardHelp'

class ScoreBoardDescription extends BoardDescription {
  width = 20
  height = 9
  image = ScoreBoard

  help = ScoreBoardHelp

  staticItem = { location: { type: LocationType.ScoreBoardSpot } }
}

export const scoreBoardDescription = new ScoreBoardDescription()