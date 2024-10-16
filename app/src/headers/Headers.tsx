/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/architects-of-amytis/rules/RuleId'
import { ComponentType } from 'react'
import { RetrieveArchitectsHeader } from './RetrieveArchitectsHeader'
import { PlaceBuildingTileHeader } from './PlaceBuildingTileHeader'
import { SelectProjectCardHeader } from './SelectProjectCardHeader'
import { ClaimKingsFavorHeader } from './ClaimKingsFavorHeader'
import { CheckProjectsHeader } from './CheckProjectsHeader'
import { TileToHandHeader } from './TileToHandHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RetrieveArchitects]: RetrieveArchitectsHeader,
  [RuleId.TileToHand]: TileToHandHeader,
  [RuleId.PlaceBuildingTile]: PlaceBuildingTileHeader,
  [RuleId.SelectProjectCard]: SelectProjectCardHeader,
  [RuleId.CheckProjects]: CheckProjectsHeader,
  [RuleId.ClaimKingsFavor]: ClaimKingsFavorHeader
}