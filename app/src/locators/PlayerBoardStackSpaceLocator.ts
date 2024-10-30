import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { DropAreaDescription, isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { buildingTileDescription } from '../material/BuildingTileDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { StackSpotCounter } from './component/StackSpotCounter'

class PlayerBoardStackSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerBoard

  getParentItem(location: Location) {
    return playerBoardDescription.staticItems.find(item => item.location.player === location.player)
  }

  getPositionOnParent(location: Location) {
    return { x: 26.5 + location.x! * 25, y: 25.5 + location.y! * 25 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y, z } = super.getCoordinates(location, context)
    if (isItemContext(context)) {
      return { x: x! - location.z! * 0.05, y: y! - location.z! * 0.05, z: z! + location.z! * 0.05 }
    } else {
      return { x, y, z: 5 }
    }
  }

  locationDescription = new PlayerBoardSpotLocationDescription(buildingTileDescription)
}

class PlayerBoardSpotLocationDescription extends DropAreaDescription {
  content = StackSpotCounter

  extraCss = css`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    > span {
      font-size: 1.75em;
      font-weight: bolder;
      color: white;
      opacity: 0.7;
      text-shadow: 3px 3px 0 #000, -3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000;
      margin-right: 0.2em;
    }
  `
}

export const playerBoardStackSpaceLocator = new PlayerBoardStackSpaceLocator()