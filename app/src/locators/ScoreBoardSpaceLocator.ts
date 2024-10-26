import { css } from '@emotion/react'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { ItemContext, LocationDescription, Locator } from '@gamepark/react-game'
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

  locationDescription = new LocationDescription({width: 1, height: 1, borderRadius: 0.5, extraCss: css`border: 1px solid white`})

  // TODO: Update. Just for testing
  positions = [
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 },
    { x: 7, y: 11 },
    { x: 15, y: 11 },
    { x: 23, y: 11 },
    { x: 30, y: 11 },
    { x: 37, y: 11 },
    { x: 44, y: 11 },
    { x: 51, y: 11 },
    { x: 58, y: 11 },
    { x: 65, y: 11 },
    { x: 72, y: 11 }
  ]
}

export const scoreBoardSpaceLocator = new ScoreBoardSpaceLocator()