import { getEnumValues } from "@gamepark/rules-api";

export enum Architect {
  Black = 1, White
}

export const architects = getEnumValues(Architect)
