import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { buildingTileDescription } from './BuildingTileDescription'
import { projectCardDescription } from './ProjectCardDescription'
import { favorBoardDescription } from './FavorBoardDescription'
import { scoreBoardDescription } from './ScoreBoardDescription'
import { mainBoardDescription } from './MainBoardDescription'
import { playerBoardDescription } from './PlayerBoardDescription'
import { pawnDescription } from './PawnDescription'
import { architectDescription } from './ArchitectDescription'
import { firstPlayerCardDescription } from './FirstPlayerCardDescription'
import { buildingCardDescription } from './BuildingCardDescription'

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
