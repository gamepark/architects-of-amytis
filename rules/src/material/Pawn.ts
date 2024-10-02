import { getEnumValues } from "@gamepark/rules-api";

export enum Pawn {
  Black = 1, White
}

export const pawns = getEnumValues(Pawn)
