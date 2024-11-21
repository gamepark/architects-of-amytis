import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { architectDescription } from './ArchitectDescription'
import { buildingCardDescription } from './BuildingCardDescription'
import { buildingTileDescription } from './BuildingTileDescription'
import { favorBoardDescription } from './FavorBoardDescription'
import { firstPlayerCardDescription } from './FirstPlayerCardDescription'
import { frenchBuildingCardDescription } from './fr/FrenchBuildingCardDescription'
import { mainBoardDescription } from './MainBoardDescription'
import { pawnDescription } from './PawnDescription'
import { playerBoardDescription } from './PlayerBoardDescription'
import { projectCardDescription } from './ProjectCardDescription'
import { scoreBoardDescription } from './ScoreBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.MainBoard]: mainBoardDescription,
  [MaterialType.FavorBoard]: favorBoardDescription,
  [MaterialType.ScoreBoard]: scoreBoardDescription,
  [MaterialType.BuildingTile]: buildingTileDescription,
  [MaterialType.ProjectCard]: projectCardDescription,
  [MaterialType.PlayerBoard]: playerBoardDescription,
  [MaterialType.Pawn]: pawnDescription,
  [MaterialType.Architect]: architectDescription,
  [MaterialType.FirstPlayerCard]: firstPlayerCardDescription,
  [MaterialType.BuildingCard]: buildingCardDescription
}

export const MaterialI18n = {
  'fr': {
    [MaterialType.BuildingCard]: frenchBuildingCardDescription
  }
}
