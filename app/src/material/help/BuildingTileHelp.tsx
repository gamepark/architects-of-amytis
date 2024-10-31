/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { BuildingCardSide, BuildingColor, getBuildingColor, getBuildingType } from '@gamepark/architects-of-amytis/material/Building'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'

export const BuildingTileHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()!
  if (item.id !== undefined) {
    const building = rules.material(MaterialType.BuildingTile).id(item.id)
    const color = getBuildingColor(building.getItem()?.id)
    const colorLabel = (() => {
      switch (color) {
        case BuildingColor.Blue: return 'Blue';
        case BuildingColor.Green: return 'Green';
        case BuildingColor.Orange: return 'Orange';
        case BuildingColor.Purple: return 'Pink';
        default: return ''
      }
    })();
    const buildingType = getBuildingType(building.getItem()?.id)
    const type = 'building.' + buildingType
    const buildingEffect = 'building.' + buildingType + '.' + (rules.remind(Memory.BuildingCardsSides)[buildingType] === BuildingCardSide.SideA ? 'A' : 'B')
    return <>
      <h2><Trans defaults="building-tile" values={{color: colorLabel, type: t(type)}}></Trans></h2>
      <p>{t('building-tile.help', { buildingEffect: t(buildingEffect) })}</p>
    </>
  } else {
    return <>
      <h2><Trans defaults="building-tile" values={{color: '', type: ''}}></Trans></h2>
    </>
  }
}
