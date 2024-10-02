import { PlayerColor } from "@gamepark/architects-of-amytis/PlayerColor"
import { TokenDescription } from "@gamepark/react-game"
import BlackPawn from '../images/resources/BlackPawn.png'
import WhitePawn from '../images/resources/WhitePawn.png'

class PawnDescription extends TokenDescription {
  // borderRadius = 0.5
  width = 1
  height = 1
  
  images = {
    [PlayerColor.Black]: BlackPawn,
    [PlayerColor.White]: WhitePawn
  }

  // getSize(itemId: number): ComponentSize {
  //   return itemId === 3 ? { width: 3.315, height: 3.4 } : { width: 1.67, height: 3 }
  // }
}

export const pawnDescription = new PawnDescription()