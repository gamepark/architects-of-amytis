import { BuildingCardSide, BuildingType, buildingTypes } from '@gamepark/architects-of-amytis/material/Building'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import GardenA from '../images/cards/en/BlackGardenA.jpg'
import GardenB from '../images/cards/en/BlackGardenB.jpg'
import MarketA from '../images/cards/en/BlackMarketA.jpg'
import MarketB from '../images/cards/en/BlackMarketB.jpg'
import PalaceA from '../images/cards/en/BlackPalaceA.jpg'
import PalaceB from '../images/cards/en/BlackPalaceB.jpg'
import ResidenceA from '../images/cards/en/BlackResidenceA.jpg'
import ResidenceB from '../images/cards/en/BlackResidenceB.jpg'
import TheaterA from '../images/cards/en/BlackTheaterA.jpg'
import TheaterB from '../images/cards/en/BlackTheaterB.jpg'
import WallA from '../images/cards/en/BlackWallA.jpg'
import WallB from '../images/cards/en/BlackWallB.jpg'

class BuildingCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5
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

  getStaticItems({ rules }: MaterialContext) {
    return buildingTypes.map(buildingType => {
      const side = rules.remind<Record<BuildingType, BuildingCardSide>>(Memory.BuildingCardsSides)[buildingType]
      return ({
        id: buildingType + side,
        location: {
          type: LocationType.BuildingCardSpot,
          x: buildingType < 4 ? buildingType - 1 : buildingType - 4,
          y: buildingType < 4 ? 0 : 1
        }
      })
    })
  }
}

const BuildingSide = {
  SideA: 10,
  SideB: 20
}

export const buildingCardDescription = new BuildingCardDescription()