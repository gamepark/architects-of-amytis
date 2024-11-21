import { BuildingCardSide, BuildingType, buildingTypes } from '@gamepark/architects-of-amytis/material/Building'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import BlackGardenA from '../images/cards/en/BlackGardenA.jpg'
import BlackGardenB from '../images/cards/en/BlackGardenB.jpg'
import BlackMarketA from '../images/cards/en/BlackMarketA.jpg'
import BlackMarketB from '../images/cards/en/BlackMarketB.jpg'
import BlackPalaceA from '../images/cards/en/BlackPalaceA.jpg'
import BlackPalaceB from '../images/cards/en/BlackPalaceB.jpg'
import BlackResidenceA from '../images/cards/en/BlackResidenceA.jpg'
import BlackResidenceB from '../images/cards/en/BlackResidenceB.jpg'
import BlackTheaterA from '../images/cards/en/BlackTheaterA.jpg'
import BlackTheaterB from '../images/cards/en/BlackTheaterB.jpg'
import BlackWallA from '../images/cards/en/BlackWallA.jpg'
import BlackWallB from '../images/cards/en/BlackWallB.jpg'
import WhiteGardenA from '../images/cards/en/WhiteGardenA.jpg'
import WhiteGardenB from '../images/cards/en/WhiteGardenB.jpg'
import WhiteMarketA from '../images/cards/en/WhiteMarketA.jpg'
import WhiteMarketB from '../images/cards/en/WhiteMarketB.jpg'
import WhitePalaceA from '../images/cards/en/WhitePalaceA.jpg'
import WhitePalaceB from '../images/cards/en/WhitePalaceB.jpg'
import WhiteResidenceA from '../images/cards/en/WhiteResidenceA.jpg'
import WhiteResidenceB from '../images/cards/en/WhiteResidenceB.jpg'
import WhiteTheaterA from '../images/cards/en/WhiteTheaterA.jpg'
import WhiteTheaterB from '../images/cards/en/WhiteTheaterB.jpg'
import WhiteWallA from '../images/cards/en/WhiteWallA.jpg'
import WhiteWallB from '../images/cards/en/WhiteWallB.jpg'
import { BuildingCardHelp } from './help/BuildingCardHelp'

class BuildingCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5
  images = {
    [BuildingType.Garden + BuildingCardSide.SideA * 10 + PlayerColor.Black * 100]: BlackGardenA,
    [BuildingType.Garden + BuildingCardSide.SideB * 10 + PlayerColor.Black * 100]: BlackGardenB,
    [BuildingType.Market + BuildingCardSide.SideA * 10 + PlayerColor.Black * 100]: BlackMarketA,
    [BuildingType.Market + BuildingCardSide.SideB * 10 + PlayerColor.Black * 100]: BlackMarketB,
    [BuildingType.Wall + BuildingCardSide.SideA * 10 + PlayerColor.Black * 100]: BlackWallA,
    [BuildingType.Wall + BuildingCardSide.SideB * 10 + PlayerColor.Black * 100]: BlackWallB,
    [BuildingType.Palace + BuildingCardSide.SideA * 10 + PlayerColor.Black * 100]: BlackPalaceA,
    [BuildingType.Palace + BuildingCardSide.SideB * 10 + PlayerColor.Black * 100]: BlackPalaceB,
    [BuildingType.Residence + BuildingCardSide.SideA * 10 + PlayerColor.Black * 100]: BlackResidenceA,
    [BuildingType.Residence + BuildingCardSide.SideB * 10 + PlayerColor.Black * 100]: BlackResidenceB,
    [BuildingType.Theater + BuildingCardSide.SideA * 10 + PlayerColor.Black * 100]: BlackTheaterA,
    [BuildingType.Theater + BuildingCardSide.SideB * 10 + PlayerColor.Black * 100]: BlackTheaterB,
    [BuildingType.Garden + BuildingCardSide.SideA * 10 + PlayerColor.White * 100]: WhiteGardenA,
    [BuildingType.Garden + BuildingCardSide.SideB * 10 + PlayerColor.White * 100]: WhiteGardenB,
    [BuildingType.Market + BuildingCardSide.SideA * 10 + PlayerColor.White * 100]: WhiteMarketA,
    [BuildingType.Market + BuildingCardSide.SideB * 10 + PlayerColor.White * 100]: WhiteMarketB,
    [BuildingType.Wall + BuildingCardSide.SideA * 10 + PlayerColor.White * 100]: WhiteWallA,
    [BuildingType.Wall + BuildingCardSide.SideB * 10 + PlayerColor.White * 100]: WhiteWallB,
    [BuildingType.Palace + BuildingCardSide.SideA * 10 + PlayerColor.White * 100]: WhitePalaceA,
    [BuildingType.Palace + BuildingCardSide.SideB * 10 + PlayerColor.White * 100]: WhitePalaceB,
    [BuildingType.Residence + BuildingCardSide.SideA * 10 + PlayerColor.White * 100]: WhiteResidenceA,
    [BuildingType.Residence + BuildingCardSide.SideB * 10 + PlayerColor.White * 100]: WhiteResidenceB,
    [BuildingType.Theater + BuildingCardSide.SideA * 10 + PlayerColor.White * 100]: WhiteTheaterA,
    [BuildingType.Theater + BuildingCardSide.SideB * 10 + PlayerColor.White * 100]: WhiteTheaterB
  }

  help = BuildingCardHelp

  getStaticItems({ rules, player = rules.players[0] }: MaterialContext) {
    return this.getBuildingCards(rules.remind<Record<BuildingType, BuildingCardSide>>(Memory.BuildingCardsSides), player)
  }

  getBuildingCards(sides: Record<BuildingType, BuildingCardSide>, player: PlayerColor) {
    return buildingTypes.map(buildingType => ({
      id: player * 100 + sides[buildingType] * 10 + buildingType,
      location: {
        player,
        type: LocationType.BuildingCardSpot,
        x: buildingType - 1
      }
    }))
  }
}

export const buildingCardDescription = new BuildingCardDescription()