import { CardDescription } from '@gamepark/react-game'
import FirsPlayerCard from '../images/cards/en/FirstPlayerCard.jpg'
import { FirstPlayerCardHelp } from './help/FirstPlayerCardHelp'

class FirstPlayerCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5  
  image = FirsPlayerCard

  help = FirstPlayerCardHelp
}

export const firstPlayerCardDescription = new FirstPlayerCardDescription()