import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '../../../../rules-api/src'
import { buildingCardDescription } from '../material/BuildingCardDescription'

class BuildingCardSpotLocator extends FlexLocator {
  gap = { x: buildingCardDescription.width + 1.5 }
  lineSize = 3
  lineGap = { y: buildingCardDescription.height + 1.5 }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return {
      x: -54,
      y: player === location.player ? 9 : -22
    }
  }

  getHoverTransform = () => ['translateX(3em)', 'translateZ(10em)', 'scale(2)']
}

export const buildingCardSpotLocator = new BuildingCardSpotLocator()