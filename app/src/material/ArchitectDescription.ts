import { PlayerColor } from "@gamepark/architects-of-amytis/PlayerColor"
import { TokenDescription } from "@gamepark/react-game"
import BlackArchitect from '../images/resources/BlackArchitect.png'
import WhiteArchitect from '../images/resources/WhiteArchitect.png'
import { ArchitectHelp } from "./help/ArchitectHelp"

class ArchitectDescription extends TokenDescription {
  borderRadius = 0.5
  width = 2.6 * 0.7
  height = 3.9 * 0.7
  
  images = {
    [PlayerColor.Black]: BlackArchitect,
    [PlayerColor.White]: WhiteArchitect
  }

  help = ArchitectHelp
}

export const architectDescription = new ArchitectDescription()