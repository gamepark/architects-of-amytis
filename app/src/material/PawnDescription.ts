import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import BlackPawn from '../images/resources/BlackPawn.png'
import WhitePawn from '../images/resources/WhitePawn.png'

class PawnDescription extends TokenDescription {
  borderRadius = 0.5
  width = 2.3
  height = 2.3

  images = {
    [PlayerColor.Black]: BlackPawn,
    [PlayerColor.White]: WhitePawn
  }
}

export const pawnDescription = new PawnDescription()