import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import FirsPlayerCard from '../images/cards/en/FirstPlayerCard.jpg'
import { FirstPlayerCardHelp } from './help/FirstPlayerCardHelp'

class FirstPlayerCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5  
  image = FirsPlayerCard

  getStaticItems(context: MaterialContext) {
    return [{
      location: {
        type: LocationType.FirstPlayerCardSpot,
        player: context.rules.players[0]
      }
    }]
  }

  help = FirstPlayerCardHelp
}

export const firstPlayerCardDescription = new FirstPlayerCardDescription()