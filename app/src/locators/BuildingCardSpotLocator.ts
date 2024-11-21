import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
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

  getHoverTransform(item: MaterialItem) {
    const x = item.location.x! % 3 === 0 ? 3 : item.location.x! % 3 === 1 ? 0 : -3
    return [`translateX(${x}em)`, 'translateZ(10em)', 'scale(2)']
  }
}

export const buildingCardSpotLocator = new BuildingCardSpotLocator()