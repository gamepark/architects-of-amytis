/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/architects-of-amytis/rules/RuleId'
import { ComponentType } from 'react'
import { EndGameScoreHeader } from './EndGameScoreHeader'
import { CheckProjectsHeader } from './CheckProjectsHeader'
import { ChooseBuildingTileHeader } from './ChooseBuildingTileHeader'
import { ClaimKingsFavorHeader } from './ClaimKingsFavorHeader'
import { PlaceBuildingTileHeader } from './PlaceBuildingTileHeader'
import { RetrieveArchitectsHeader } from './RetrieveArchitectsHeader'
import { SelectProjectCardHeader } from './SelectProjectCardHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RetrieveArchitects]: RetrieveArchitectsHeader,
  [RuleId.ChooseBuildingTile]: ChooseBuildingTileHeader,
  [RuleId.PlaceBuildingTile]: PlaceBuildingTileHeader,
  [RuleId.SelectProjectCard]: SelectProjectCardHeader,
  [RuleId.CheckProjects]: CheckProjectsHeader,
  [RuleId.ClaimKingsFavor]: ClaimKingsFavorHeader,
  [RuleId.EndGameScore]: EndGameScoreHeader
}