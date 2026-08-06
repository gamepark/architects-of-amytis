import { TFunction, OptionsSpecV2 } from '@gamepark/rules-api'
import { BuildingCardSide } from './material/Building'
import { PlayerColor, playerColors } from './PlayerColor'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type ArchitectsOfAmytisOptions = {
  players: PlayerOptions[],
  gardenSide: BuildingCardSide,
  marketSide: BuildingCardSide,
  wallSide: BuildingCardSide,
  palaceSide: BuildingCardSide,
  residenceSide: BuildingCardSide,
  theaterSide: BuildingCardSide,
}

/**
 * The option space of architects-of-amytis: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const ArchitectsOfAmytisOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 2 },
  identities: { values: playerColors },
  options: {
    gardenSide: { kind: 'enum', values: [1, 2] },
    marketSide: { kind: 'enum', values: [1, 2] },
    wallSide: { kind: 'enum', values: [1, 2] },
    palaceSide: { kind: 'enum', values: [1, 2] },
    residenceSide: { kind: 'enum', values: [1, 2] },
    theaterSide: { kind: 'enum', values: [1, 2] }
  }
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
  switch (playerId) {
    case PlayerColor.Black:
      return t('Black')
    case PlayerColor.White:
      return t('White')
  }
}