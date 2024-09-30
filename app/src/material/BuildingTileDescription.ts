import { Building } from '@gamepark/architects-of-amytis/material/Building'
import { CardDescription } from '@gamepark/react-game'
import BlueGardenTile from '../images/tiles/BlueGardenTile.jpg'

class BuildingTileDescription extends CardDescription {
  width = 4
  height = 4
  borderRadius = 0.5
  images = {
    [Building.BlueGarden]: BlueGardenTile
  }
}

export const buildingTileDescription = new BuildingTileDescription()