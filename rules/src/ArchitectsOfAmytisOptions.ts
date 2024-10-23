import { EnumOption, OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { BuildingCardSide, buildingCardSides, BuildingType } from './material/Building'
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

const buildingOption = (buildingType: BuildingType): EnumOption<BuildingCardSide> => ({
  label: t => t('building.side', { building: t(`building.${buildingType}`) }),
  values: buildingCardSides,
  valueSpec: (side: BuildingCardSide) => ({
    label: t => side === BuildingCardSide.SideA ? t('Side A') : t('Side B'),
    help: t => t(`building.${buildingType}.${side === BuildingCardSide.SideA ? 'A' : 'B'}`),
    competitiveDisabled: true
  })
})

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const ArchitectsOfAmytisOptionsSpec: OptionsSpec<ArchitectsOfAmytisOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Player color'),
      values: playerColors,
      valueSpec: color => ({ label: t => getPlayerName(color, t) })
    }
  },
  gardenSide: buildingOption(BuildingType.Garden),
  marketSide: buildingOption(BuildingType.Market),
  wallSide: buildingOption(BuildingType.Wall),
  palaceSide: buildingOption(BuildingType.Palace),
  residenceSide: buildingOption(BuildingType.Residence),
  theaterSide: buildingOption(BuildingType.Theater)
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
  switch (playerId) {
    case PlayerColor.Black:
      return t('Black')
    case PlayerColor.White:
      return t('White')
  }
}