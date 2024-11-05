/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { BuildingCardSide, getBuildingType } from '@gamepark/architects-of-amytis/material/Building'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const BuildingCardHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const buildingType = getBuildingType(item.id)
  const buildingEffect = 'building.' + buildingType + '.' + (rules.remind(Memory.BuildingCardsSides)[buildingType] === BuildingCardSide.SideA ? 'A' : 'B')
  return <>
    <h2>{t('building-card')}</h2>
    <p>{t('building-tile.help', { buildingEffect: t(buildingEffect) })}</p>
  </>
}
