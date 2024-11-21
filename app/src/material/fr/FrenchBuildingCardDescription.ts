import { BuildingCardSide, BuildingType } from '@gamepark/architects-of-amytis/material/Building'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { BuildingCardDescription } from '../BuildingCardDescription'
import BlackGardenA from '../../images/cards/fr/BlackGardenA.jpg'
import BlackGardenB from '../../images/cards/fr/BlackGardenB.jpg'
import BlackMarketA from '../../images/cards/fr/BlackMarketA.jpg'
import BlackMarketB from '../../images/cards/fr/BlackMarketB.jpg'
import BlackPalaceA from '../../images/cards/fr/BlackPalaceA.jpg'
import BlackPalaceB from '../../images/cards/fr/BlackPalaceB.jpg'
import BlackResidenceA from '../../images/cards/fr/BlackResidenceA.jpg'
import BlackResidenceB from '../../images/cards/fr/BlackResidenceB.jpg'
import BlackTheaterA from '../../images/cards/fr/BlackTheaterA.jpg'
import BlackTheaterB from '../../images/cards/fr/BlackTheaterB.jpg'
import BlackWallA from '../../images/cards/fr/BlackWallA.jpg'
import BlackWallB from '../../images/cards/fr/BlackWallB.jpg'
import WhiteGardenA from '../../images/cards/fr/WhiteGardenA.jpg'
import WhiteGardenB from '../../images/cards/fr/WhiteGardenB.jpg'
import WhiteMarketA from '../../images/cards/fr/WhiteMarketA.jpg'
import WhiteMarketB from '../../images/cards/fr/WhiteMarketB.jpg'
import WhitePalaceA from '../../images/cards/fr/WhitePalaceA.jpg'
import WhitePalaceB from '../../images/cards/fr/WhitePalaceB.jpg'
import WhiteResidenceA from '../../images/cards/fr/WhiteResidenceA.jpg'
import WhiteResidenceB from '../../images/cards/fr/WhiteResidenceB.jpg'
import WhiteTheaterA from '../../images/cards/fr/WhiteTheaterA.jpg'
import WhiteTheaterB from '../../images/cards/fr/WhiteTheaterB.jpg'
import WhiteWallA from '../../images/cards/fr/WhiteWallA.jpg'
import WhiteWallB from '../../images/cards/fr/WhiteWallB.jpg'

class FrenchBuildingCardDescription extends BuildingCardDescription {
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
}

export const frenchBuildingCardDescription = new FrenchBuildingCardDescription()