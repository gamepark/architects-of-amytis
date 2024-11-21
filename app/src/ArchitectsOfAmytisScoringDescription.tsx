import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { FavorType } from '@gamepark/architects-of-amytis/material/FavorType'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Project, projectsProperties } from '@gamepark/architects-of-amytis/material/Project'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { EndGameScoreRule } from '@gamepark/architects-of-amytis/rules/EndGameScoreRule'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'
import { ScoringDescription } from '@gamepark/react-client'
import { getEnumValues } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { Trans } from 'react-i18next'

enum ScoringKeys {
  BuildingTiles, ValidatedProjects, Favors
}

export class ArchitectsOfAmytisScoringDescription implements ScoringDescription {
  getScoringKeys = () => getEnumValues(ScoringKeys)

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.BuildingTiles:
        return <Trans defaults="building-tiles"/>
      case ScoringKeys.ValidatedProjects:
        return <Trans defaults="projects.validated"/>
      case ScoringKeys.Favors:
        return <Trans defaults="favor-board"/>
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerColor, rules: ArchitectsOfAmytisRules) {
    switch (key) {
      case ScoringKeys.BuildingTiles:
        return this.getBuildingScore(rules, player)
      case ScoringKeys.ValidatedProjects:
        return this.getProjectsScore(rules, player)
      case ScoringKeys.Favors:
        return this.getFavorsScore(rules, player)
    }
  }

  getBuildingScore(rules: ArchitectsOfAmytisRules, player: PlayerColor) {
    return rules.remind(Memory.Score, player) - this.getProjectsScore(rules, player) - this.getFavorsScore(rules, player)
  }

  getProjectsScore(rules: ArchitectsOfAmytisRules, player: PlayerColor) {
    const projects = rules.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).player(player).getItems<Project>()
    return sumBy(projects, project => projectsProperties[project.id].points)
  }

  getFavorsScore(rules: ArchitectsOfAmytisRules, player: PlayerColor) {
    const topRowPawns = rules.material(MaterialType.Pawn).id(player)
      .location(LocationType.FavorBoardSpace)
      .locationId(id => id !== FavorType.PawnsInBottomRow).getItems()
    const scoreRule = new EndGameScoreRule(rules.game)
    return sumBy(topRowPawns, pawn => scoreRule.getFavorScore(player, pawn.location.id))
      + scoreRule.getFavorScore(player, FavorType.PawnsInBottomRow)
  }
}