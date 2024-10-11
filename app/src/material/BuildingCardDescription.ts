import { CardDescription } from '@gamepark/react-game'
import GardenA from '../images/cards/en/BlackGardenA.jpg'
import GardenB from '../images/cards/en/BlackGardenB.jpg'
import MarketA from '../images/cards/en/BlackMarketA.jpg'
import MarketB from '../images/cards/en/BlackMarketB.jpg'
import WallA from '../images/cards/en/BlackWallA.jpg'
import WallB from '../images/cards/en/BlackWallB.jpg'
import PalaceA from '../images/cards/en/BlackPalaceA.jpg'
import PalaceB from '../images/cards/en/BlackPalaceB.jpg'
import ResidenceA from '../images/cards/en/BlackResidenceA.jpg'
import ResidenceB from '../images/cards/en/BlackResidenceB.jpg'
import TheaterA from '../images/cards/en/BlackTheaterA.jpg'
import TheaterB from '../images/cards/en/BlackTheaterB.jpg'
import { BuildingType } from '@gamepark/architects-of-amytis/material/Building'

class BuildingCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5
  // image = GardenA
  images = {
    [BuildingType.Garden + BuildingSide.SideA]: GardenA,
    [BuildingType.Garden + BuildingSide.SideB]: GardenB,
    [BuildingType.Market + BuildingSide.SideA]: MarketA,
    [BuildingType.Market + BuildingSide.SideB]: MarketB,
    [BuildingType.Wall + BuildingSide.SideA]: WallA,
    [BuildingType.Wall + BuildingSide.SideB]: WallB,
    [BuildingType.Palace + BuildingSide.SideA]: PalaceA,
    [BuildingType.Palace + BuildingSide.SideB]: PalaceB,
    [BuildingType.Residence + BuildingSide.SideA]: ResidenceA,
    [BuildingType.Residence + BuildingSide.SideB]: ResidenceB,
    [BuildingType.Theater + BuildingSide.SideA]: TheaterA,
    [BuildingType.Theater + BuildingSide.SideB]: TheaterB
  }
}

const BuildingSide = {
  SideA: 10,
  SideB: 20
}

export const buildingCardDescription = new BuildingCardDescription()