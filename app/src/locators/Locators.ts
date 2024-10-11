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
import { playerProjectCardsSpotLocator } from './PlayerProjectCardsSpotLocator'
import { firstPlayerCardSpotLocator } from './FirstPlayerCardSpotLocator'
import { playerBoardStackSpaceLocator } from './PlayerBoardStackSpaceLocator'
import { favorBoardSpaceLocator } from './FavorBoardSpaceLocator'
import { playerValidatedProjectCardsPileLocator } from './PlayerValidatedProjectCardsPileLocator'
import { inHandSpotLocator } from './InHandSpotLocator'
import { buildingCardSpotLocator } from './BuildingCardSpotLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MainBoardSpot]: mainBoardSpotLocator,
  [LocationType.ScoreBoardSpot]: scoreBoardSpotLocator,
  [LocationType.ScoreBoardSpace]: scoreBoardSpaceLocator,
  [LocationType.FavorBoardSpot]: favorBoardSpotLocator,
  [LocationType.FavorBoardSpace]: favorBoardSpaceLocator,
  [LocationType.MainBoardStackSpace]: mainBoardStackSpaceLocator,
  [LocationType.ProjectCardsDeck]: projectCardsDeckLocator,
  [LocationType.ProjectCardsDisplay]: projectCardsDisplayLocator,
  [LocationType.PlayerBoardSpot]: playerBoardSpotLocator,
  [LocationType.PlayerBoardStackSpace]: playerBoardStackSpaceLocator,
  [LocationType.PlayerProjectCardsSpot]: playerProjectCardsSpotLocator,
  [LocationType.PlayerValidatedProjectCardsPile]: playerValidatedProjectCardsPileLocator,
  [LocationType.ScoreRangeAreaSpace]: scoreRangeAreaSpaceLocator,
  [LocationType.PlayerPawnsSupply]: playerPawnsSupplyLocator,
  [LocationType.PlayerArchitectsSupply]: playerArchitectsSupplyLocator,
  [LocationType.FirstPlayerCardSpot]: firstPlayerCardSpotLocator,
  [LocationType.InHandSpot]: inHandSpotLocator,
  [LocationType.BuildingCardSpot]: buildingCardSpotLocator,
}
