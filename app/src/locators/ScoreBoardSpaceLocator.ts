import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class ScoreBoardSpaceLocator extends Locator {
  parentItemType = MaterialType.ScoreBoard

  getPositionOnParent(location: Location) {
    return this.positions[location.x!] ?? this.positionOnParent
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z } = super.getItemCoordinates(item, context)
    const pawnsSameLocation = context.rules.material(MaterialType.Pawn).location(LocationType.ScoreBoardSpace).filter(pawn => {
      return pawn.id !== item.location.player && pawn.location.x === item.location.x  
    })

    return { x: x, 
              y: pawnsSameLocation.length > 0 && item.location.player === context.rules.players[0] ? y! - 0.5 : y,
              z: pawnsSameLocation.length > 0 && item.location.player === context.rules.players[0] ? 1 : z
    }
  }

  positions = [
    { x: 7, y: 11 },
    { x: 14.5, y: 11 },
    { x: 22.5, y: 15 },
    { x: 31, y: 11 },
    { x: 39, y: 15 },
    { x: 47, y: 11 },
    { x: 55.5, y: 15 },
    { x: 63.5, y: 11 },
    { x: 71.5, y: 15 },
    { x: 79.5, y: 11 },
    { x: 87.5, y: 15 },
    { x: 95.5, y: 23 },
    { x: 87.5, y: 33 },
    { x: 79.5, y: 37 },
    { x: 71.5, y: 33 },
    { x: 63.5, y: 37 },
    { x: 55.5, y: 33 },
    { x: 47, y: 37 },
    { x: 39, y: 33 },
    { x: 31, y: 37 },
    { x: 23, y: 33 },
    { x: 17.5, y: 45 },
    { x: 23, y: 59 },
    { x: 30, y: 63 },
    { x: 37.5, y: 59 },
    { x: 44.5, y: 63 },
    { x: 51.5, y: 59 },
    { x: 59, y: 63 },
    { x: 66.5, y: 59 },
    { x: 74, y: 63 },
    { x: 81, y: 59 },
    { x: 88.5, y: 63 },
    { x: 95.5, y: 70 },
    { x: 94.5, y: 85 },
    { x: 86, y: 89 },
    { x: 78.5, y: 85 },
    { x: 71, y: 89 },
    { x: 63.5, y: 85 },
    { x: 56, y: 89 },
    { x: 48.5, y: 85 },
    { x: 41.5, y: 89 },
    { x: 34, y: 85 },
    { x: 26.5, y: 89 },
    { x: 19, y: 85 },
    { x: 11.5, y: 89 },
    { x: 5, y: 81 },
    { x: 8, y: 67 },
    { x: 5, y: 53 },
    { x: 8, y: 40 },
    { x: 5, y: 25.5 }
  ]
}

export const scoreBoardSpaceLocator = new ScoreBoardSpaceLocator()