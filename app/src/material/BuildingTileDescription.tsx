import { faHandBackFist } from '@fortawesome/free-solid-svg-icons/faHandBackFist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Building } from '@gamepark/architects-of-amytis/material/Building'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import BlueGardenTile from '../images/tiles/BlueGardenTile.jpg'
import BlueMarketTile from '../images/tiles/BlueMarketTile.jpg'
import BluePalaceTile from '../images/tiles/BluePalaceTile.jpg'
import BlueResidenceTile from '../images/tiles/BlueResidenceTile.jpg'
import BlueTheaterTile from '../images/tiles/BlueTheaterTile.jpg'
import BlueWallTile from '../images/tiles/BlueWallTile.jpg'
import BuildingTileBack from '../images/tiles/BuildingTileBack.jpg'
import GreenGardenTile from '../images/tiles/GreenGardenTile.jpg'
import GreenMarketTile from '../images/tiles/GreenMarketTile.jpg'
import GreenPalaceTile from '../images/tiles/GreenPalaceTile.jpg'
import GreenResidenceTile from '../images/tiles/GreenResidenceTile.jpg'
import GreenTheaterTile from '../images/tiles/GreenTheaterTile.jpg'
import GreenWallTile from '../images/tiles/GreenWallTile.jpg'
import OrangeGardenTile from '../images/tiles/OrangeGardenTile.jpg'
import OrangeMarketTile from '../images/tiles/OrangeMarketTile.jpg'
import OrangePalaceTile from '../images/tiles/OrangePalaceTile.jpg'
import OrangeResidenceTile from '../images/tiles/OrangeResidenceTile.jpg'
import OrangeTheaterTile from '../images/tiles/OrangeTheaterTile.jpg'
import OrangeWallTile from '../images/tiles/OrangeWallTile.jpg'
import PurpleGardenTile from '../images/tiles/PurpleGardenTile.jpg'
import PurpleMarketTile from '../images/tiles/PurpleMarketTile.jpg'
import PurplePalaceTile from '../images/tiles/PurplePalaceTile.jpg'
import PurpleResidenceTile from '../images/tiles/PurpleResidenceTile.jpg'
import PurpleTheaterTile from '../images/tiles/PurpleTheaterTile.jpg'
import PurpleWallTile from '../images/tiles/PurpleWallTile.jpg'
import { BuildingTileHelp } from './help/BuildingTileHelp'

class BuildingTileDescription extends CardDescription {
  width = 4
  height = 4
  borderRadius = 0.5
  backImage = BuildingTileBack
  images = {
    [Building.BlueGarden]: BlueGardenTile,
    [Building.BlueMarket]: BlueMarketTile,
    [Building.BluePalace]: BluePalaceTile,
    [Building.BlueResidence]: BlueResidenceTile,
    [Building.BlueTheater]: BlueTheaterTile,
    [Building.BlueWall]: BlueWallTile,
    [Building.OrangeGarden]: OrangeGardenTile,
    [Building.OrangeMarket]: OrangeMarketTile,
    [Building.OrangePalace]: OrangePalaceTile,
    [Building.OrangeResidence]: OrangeResidenceTile,
    [Building.OrangeTheater]: OrangeTheaterTile,
    [Building.OrangeWall]: OrangeWallTile,
    [Building.GreenGarden]: GreenGardenTile,
    [Building.GreenMarket]: GreenMarketTile,
    [Building.GreenPalace]: GreenPalaceTile,
    [Building.GreenResidence]: GreenResidenceTile,
    [Building.GreenTheater]: GreenTheaterTile,
    [Building.GreenWall]: GreenWallTile,
    [Building.PurpleGarden]: PurpleGardenTile,
    [Building.PurpleMarket]: PurpleMarketTile,
    [Building.PurplePalace]: PurplePalaceTile,
    [Building.PurpleResidence]: PurpleResidenceTile,
    [Building.PurpleTheater]: PurpleTheaterTile,
    [Building.PurpleWall]: PurpleWallTile
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const takeInHand = legalMoves.find(move =>
      isMoveItemType(MaterialType.BuildingTile)(move) && move.itemIndex === context.index && move.location.type === LocationType.PlayerHand
    )
    if (!takeInHand) return
    return <>
      {this.getHelpButton(item, context)}
      <ItemMenuButton label={<Trans defaults="Take"/>} angle={-30} move={takeInHand}>
        <FontAwesomeIcon icon={faHandBackFist}/>
      </ItemMenuButton>
    </>
  }

  help = BuildingTileHelp
}

export const buildingTileDescription = new BuildingTileDescription()