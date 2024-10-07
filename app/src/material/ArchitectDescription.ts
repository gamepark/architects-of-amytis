import { PlayerColor } from "@gamepark/architects-of-amytis/PlayerColor"
import { TokenDescription } from "@gamepark/react-game"
import BlackArchitect from '../images/resources/BlackArchitect.png'
import WhiteArchitect from '../images/resources/WhiteArchitect.png'

class ArchitectDescription extends TokenDescription {
  width = 2
  height = 4
  
  images = {
    [PlayerColor.Black]: BlackArchitect,
    [PlayerColor.White]: WhiteArchitect
  }

}

export const architectDescription = new ArchitectDescription()