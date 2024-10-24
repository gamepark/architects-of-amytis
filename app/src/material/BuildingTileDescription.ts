import { Building } from '@gamepark/architects-of-amytis/material/Building'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import BlueGardenTile from '../images/tiles/BlueGardenTile.jpg'
import BlueMarketTile from '../images/tiles/BlueMarketTile.jpg'
import BluePalaceTile from '../images/tiles/BluePalaceTile.jpg'
import BlueResidenceTile from '../images/tiles/BlueResidenceTile.jpg'
import BlueTheaterTile from '../images/tiles/BlueTheaterTile.jpg'
import BlueWallTile from '../images/tiles/BlueWallTile.jpg'
import OrangeGardenTile from '../images/tiles/OrangeGardenTile.jpg'
import OrangeMarketTile from '../images/tiles/OrangeMarketTile.jpg'
import OrangePalaceTile from '../images/tiles/OrangePalaceTile.jpg'
import OrangeResidenceTile from '../images/tiles/OrangeResidenceTile.jpg'
import OrangeTheaterTile from '../images/tiles/OrangeTheaterTile.jpg'
import OrangeWallTile from '../images/tiles/OrangeWallTile.jpg'
import GreenGardenTile from '../images/tiles/GreenGardenTile.jpg'
import GreenMarketTile from '../images/tiles/GreenMarketTile.jpg'
import GreenPalaceTile from '../images/tiles/GreenPalaceTile.jpg'
import GreenResidenceTile from '../images/tiles/GreenResidenceTile.jpg'
import GreenTheaterTile from '../images/tiles/GreenTheaterTile.jpg'
import GreenWallTile from '../images/tiles/GreenWallTile.jpg'
import PurpleGardenTile from '../images/tiles/PurpleGardenTile.jpg'
import PurpleMarketTile from '../images/tiles/PurpleMarketTile.jpg'
import PurplePalaceTile from '../images/tiles/PurplePalaceTile.jpg'
import PurpleResidenceTile from '../images/tiles/PurpleResidenceTile.jpg'
import PurpleTheaterTile from '../images/tiles/PurpleTheaterTile.jpg'
import PurpleWallTile from '../images/tiles/PurpleWallTile.jpg'
import BuildingTileBack from '../images/tiles/BuildingTileBack.jpg'
import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/architects-of-amytis/rules/RuleId'

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

  canDrag(_move: MaterialMove<number, number, number>, context: ItemContext<number, number, number>): boolean {
    if (context.rules.game.rule?.id !== RuleId.TileToHand) {
      return true
    } else {
      return false
    }
  }
}

export const buildingTileDescription = new BuildingTileDescription()