/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/architects-of-amytis/rules/RuleId'
import { ComponentType } from 'react'
import { RetrieveArchitectsHeader } from './RetrieveArchitectsHeader'
import { ChooseBuildingTileHeader } from './ChooseBuildingTileHeader'
import { SelectProjectCardHeader } from './SelectProjectCardHeader'
import { ClaimKingsFavorHeader } from './ClaimKingsFavorHeader'
import { CheckProjectsHeader } from './CheckProjectsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RetrieveArchitects]: RetrieveArchitectsHeader,
  [RuleId.ChooseBuildingTile]: ChooseBuildingTileHeader,
  [RuleId.SelectProjectCard]: SelectProjectCardHeader,
  [RuleId.CheckProjects]: CheckProjectsHeader,
  [RuleId.ClaimKingsFavor]: ClaimKingsFavorHeader
}