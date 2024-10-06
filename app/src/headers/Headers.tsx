/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/architects-of-amytis/rules/RuleId'
import { ComponentType } from 'react'
import { RetrieveArchitectsHeader } from './RetrieveArchitectsHeader'
import { ChooseBuildingTileHeader } from './ChooseBuildingTileHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RetrieveArchitects]: RetrieveArchitectsHeader,
  [RuleId.ChooseBuildingTile]: ChooseBuildingTileHeader
}