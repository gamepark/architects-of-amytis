import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { mainBoardStackSpaceLocator } from './MainBoardStackSpaceLocator'
import { projectCardsDeckLocator } from './ProjectCardsDeckLocator'
import { playerBoardSpotLocator } from './PlayerBoardSpotLocator'
import { playerPawnsSupplyLocator } from './PlayerPawnsSupplyLocator'
import { playerArchitectsSupplyLocator } from './PlayerAchitectsSupplyLocator'
import { scoreRangeAreaSpaceLocator } from './ScoreRangeAreaSpaceLocator'
import { projectCardsDisplayLocator } from './ProjectCardsDisplayLocator'
import { mainBoardSpotLocator } from './MainBoardSpotLocator'
import { scoreBoardSpotLocator } from './ScoreBoardSpotLocator'
import { favorBoardSpotLocator } from './FavorBoardSpotLocator'
import { scoreBoardSpaceLocator } from './ScoreBoardSpaceLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MainBoardSpot]: mainBoardSpotLocator,
  [LocationType.ScoreBoardSpot]: scoreBoardSpotLocator,
  [LocationType.ScoreBoardSpace]: scoreBoardSpaceLocator,
  [LocationType.FavorBoardSpot]: favorBoardSpotLocator,
  [LocationType.MainBoardStackSpace]: mainBoardStackSpaceLocator,
  [LocationType.ProjectCardsDeck]: projectCardsDeckLocator,
  [LocationType.ProjectCardsDisplay]: projectCardsDisplayLocator,
  [LocationType.PlayerBoardSpot]: playerBoardSpotLocator,
  [LocationType.ScoreRangeAreaSpace]: scoreRangeAreaSpaceLocator,
  [LocationType.PlayerPawnsSupply]: playerPawnsSupplyLocator,
  [LocationType.PlayerArchitectsSupply]: playerArchitectsSupplyLocator
}
