import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { isLocationSubset, useRules } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export const StackSpotCounter = ({ location }: { location: Location }) => {
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const count = rules.material(MaterialType.BuildingTile).location(l => isLocationSubset(l, location)).length
  if (count === 0) return null
  return <span>{count}</span>
}