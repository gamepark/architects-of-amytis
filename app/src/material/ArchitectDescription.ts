import { PlayerColor } from "@gamepark/architects-of-amytis/PlayerColor"
import { TokenDescription } from "@gamepark/react-game"
import BlackArchitect from '../images/resources/BlackArchitect.png'
import WhiteArchitect from '../images/resources/WhiteArchitect.png'

class ArchitectDescription extends TokenDescription {
  borderRadius = 0.5
  width = 2.3 * 0.7
  height = 3.5 * 0.7
  
  images = {
    [PlayerColor.Black]: BlackArchitect,
    [PlayerColor.White]: WhiteArchitect
  }

}

export const architectDescription = new ArchitectDescription()