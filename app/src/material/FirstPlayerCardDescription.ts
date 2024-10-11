import { CardDescription } from '@gamepark/react-game'
import FirsPlayerCard from '../images/cards/FirstPlayerCard.jpg'

class FirstPlayerCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5  
  image = FirsPlayerCard
}

export const firstPlayerCardDescription = new FirstPlayerCardDescription()