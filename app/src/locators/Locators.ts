import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { favorBoardDescription } from '../material/FavorBoardDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.FavorBoardSpot]: new Locator({
    coordinates: {
      x: mainBoardDescription.width / 2 + favorBoardDescription.width / 2 + 1,
      y: -mainBoardDescription.height / 2 + favorBoardDescription.height / 2
    }
  })
}
