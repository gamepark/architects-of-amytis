import { DeckLocator } from '@gamepark/react-game'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { projectCardDescription } from '../material/ProjectCardDescription'

class ProjectCardsDeckLocator extends DeckLocator {
  coordinates = { x: -mainBoardDescription.width / 2 - 1 - (projectCardDescription.width + 1) * 4 + projectCardDescription.width / 2 }
}

export const projectCardsDeckLocator = new ProjectCardsDeckLocator()