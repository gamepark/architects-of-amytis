import { getEnumValues } from '@gamepark/rules-api'

export enum BuildingType {
  Garden = 1,
  Market,
  Wall,
  Palace,
  Residence,
  Theater
}

export enum BuildingColor {
  Blue = 1, Green, Orange, Purple
}

export enum Building {
  BlueGarden = 11,
  BlueMarket,
  BlueWall,
  BluePalace,
  BlueResidence,
  BlueTheater,
  GreenGarden = 21,
  GreenMarket,
  GreenWall,
  GreenPalace,
  GreenResidence,
  GreenTheater,
  OrangeGarden = 31,
  OrangeMarket,
  OrangeWall,
  OrangePalace,
  OrangeResidence,
  OrangeTheater,
  PurpleGarden = 41,
  PurpleMarket,
  PurpleWall,
  PurplePalace,
  PurpleResidence,
  PurpleTheater
}

export const buildings = getEnumValues(Building)
export const buildingTypes = getEnumValues(BuildingType)

export const getBuildingType = (building: Building) => building % 10
export const getBuildingColor = (building: Building) => Math.floor(building / 10)

export enum BuildingCardSide {
  SideA = 1,
  SideB = 2
}

export const buildingCardSides = getEnumValues(BuildingCardSide)
