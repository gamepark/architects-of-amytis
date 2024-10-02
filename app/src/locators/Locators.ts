import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { scoreBoardDescription } from '../material/ScoreBoardDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { mainBoardStackSpace } from './MainBoardStackSpaceLocator'
import { projectCardsDeck } from './ProjectCardsDeckLocator'
import { playerBoardSpot } from './PlayerBoardSpotLocator'
import { playerPawnsSupply } from './PlayerPawnsSupplyLocator'
import { playerArchitectsSupply } from './PlayerAchitectsSupplyLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MainBoardSpot]: new Locator({
    coordinates: { x: 0, y: 0 }
  }),
  [LocationType.ScoreBoardSpot]: new Locator({
    coordinates: {
      x: mainBoardDescription.width + 1,
      y: -mainBoardDescription.height / 2 + scoreBoardDescription.height / 2
    }
  }),
  [LocationType.FavorBoardSpot]: new Locator({
    coordinates: {
    //   x: mainBoardDescription.width / 2 + favorBoardDescription.width / 2 + 1,
      x: mainBoardDescription.width + 1,
      y: scoreBoardDescription.height / 2 + 0.5
    }
  }),
  [LocationType.MainBoardStackSpace]: mainBoardStackSpace,
  [LocationType.ProjectCardsDeck]: projectCardsDeck,
  [LocationType.PlayerBoardSpot]: playerBoardSpot,
  [LocationType.PlayerPawnsSupply]: playerPawnsSupply,
  [LocationType.PlayerArchitectsSupply]: playerArchitectsSupply
}
