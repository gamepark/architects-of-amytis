import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { buildingCardSpotLocator } from './BuildingCardSpotLocator'
import { favorBoardSpaceLocator } from './FavorBoardSpaceLocator'
import { favorBoardSpotLocator } from './FavorBoardSpotLocator'
import { firstPlayerCardSpotLocator } from './FirstPlayerCardSpotLocator'
import { mainBoardStackSpaceLocator } from './MainBoardStackSpaceLocator'
import { playerArchitectsSupplyLocator } from './PlayerArchitectsSupplyLocator'
import { playerBoardSpotLocator } from './PlayerBoardSpotLocator'
import { playerBoardStackSpaceLocator } from './PlayerBoardStackSpaceLocator'
import { playerInHandSpotLocator } from './PlayerInHandSpotLocator'
import { playerPawnsSupplyLocator } from './PlayerPawnsSupplyLocator'
import { playerProjectCardsSpotLocator } from './PlayerProjectCardsSpotLocator'
import { playerValidatedProjectCardsPileLocator } from './PlayerValidatedProjectCardsPileLocator'
import { projectCardsDeckLocator } from './ProjectCardsDeckLocator'
import { projectCardsDisplayLocator } from './ProjectCardsDisplayLocator'
import { scoreBoardSpaceLocator } from './ScoreBoardSpaceLocator'
import { scoreBoardSpotLocator } from './ScoreBoardSpotLocator'
import { scoreRangeAreaSpaceLocator } from './ScoreRangeAreaSpaceLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
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
  [LocationType.PlayerInHandSpot]: playerInHandSpotLocator,
  [LocationType.BuildingCardSpot]: buildingCardSpotLocator
}
