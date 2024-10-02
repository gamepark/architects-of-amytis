import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Black = 1, White
}

export const playerColors = getEnumValues(PlayerColor)
