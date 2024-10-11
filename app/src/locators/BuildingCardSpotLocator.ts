import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class BuildingCardSpotLocator extends Locator {
  parentItemType = MaterialType.MainBoard

  getPositionOnParent(location: Location) {
    return { x: -25 - location.x! * 40, y: -5 + location.y! * 40 }
  }

  // getHoverTransform = () => ['translateZ(10em)', 'scale(2)']
}

export const buildingCardSpotLocator = new BuildingCardSpotLocator()