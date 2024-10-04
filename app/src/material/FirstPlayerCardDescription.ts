import { CardDescription } from '@gamepark/react-game'
import FirsPlayerCard from '../images/cards/FirstPlayerCard.jpg'

class FirstPlayerCardDescription extends CardDescription {
  width = 6
  height = 6
  borderRadius = 0.5  
  image = FirsPlayerCard
}

export const firstPlayerCardDescription = new FirstPlayerCardDescription()