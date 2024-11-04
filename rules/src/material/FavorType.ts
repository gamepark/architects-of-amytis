import { getEnumValues } from '@gamepark/rules-api'

export enum FavorType {
  OneInStack,
  TwoInStack,
  ThreeInStack,
  FourInStack,
  Staircase,
  ThreeInCorner,
  ProjectsValidated,
  PawnsInBottomRow
}

export const favorTypes = getEnumValues(FavorType)
