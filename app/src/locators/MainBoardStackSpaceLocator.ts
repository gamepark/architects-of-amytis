import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { DropAreaDescription, isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import { buildingTileDescription } from '../material/BuildingTileDescription'
import { StackSpotCounter } from './component/StackSpotCounter'

class MainBoardStackSpaceLocator extends Locator {
  parentItemType = MaterialType.MainBoard

  getPositionOnParent(location: Location) {
    return { x: 19 + location.x! * 31.5, y: 22.5 + location.y! * 31 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y, z } = super.getCoordinates(location, context)
    if (isItemContext(context)) {
      return { x: x! - location.z! * 0.05, y: y! - location.z! * 0.05, z: z! + location.z! * 0.05 }
    } else {
      return { x, y, z: 5 }
    }
  }
  
  locationDescription = new MainBoardSpotLocationDescription(buildingTileDescription)
}

class MainBoardSpotLocationDescription extends DropAreaDescription {
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

export const mainBoardStackSpaceLocator = new MainBoardStackSpaceLocator()