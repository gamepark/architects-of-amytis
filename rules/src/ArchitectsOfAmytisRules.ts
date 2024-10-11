import { FillGapStrategy, HiddenMaterialRules, hideItemId, MaterialGame, MaterialMove, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { RetrieveArchitectsRule } from './rules/RetrieveArchitectsRule'
import { PlaceBuildingTileRule } from './rules/PlaceBuildingTileRule'
import { SelectProjectCardRule } from './rules/SelectProjectCardRule'
import { ClaimKingsFavorRule } from './rules/ClaimKingsFavorRule'
import { CheckProjectsRule } from './rules/CheckProjectsRule'
import { CheckEndGameRule } from './rules/CheckEndGameRule'
import { EndGameScoreRule } from './rules/EndGameScoreRule'
import { TileToHandRule } from './rules/TileToHandRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArchitectsOfAmytisRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.RetrieveArchitects]: RetrieveArchitectsRule,
    [RuleId.PlaceBuildingTile]: PlaceBuildingTileRule,
    [RuleId.TileToHand]: TileToHandRule,
    [RuleId.SelectProjectCard]: SelectProjectCardRule,
    [RuleId.CheckProjects]: CheckProjectsRule,
    [RuleId.ClaimKingsFavor]: ClaimKingsFavorRule,
    [RuleId.CheckEndGame]: CheckEndGameRule,
    [RuleId.EndGameScore]: EndGameScoreRule
  }

  locationsStrategies = {
    [MaterialType.ProjectCard]: {
      [LocationType.ProjectCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.ProjectCardsDisplay]: new FillGapStrategy(),
      [LocationType.PlayerProjectCardsSpot]: new PositiveSequenceStrategy(),
    }
  }

  hidingStrategies = {
    [MaterialType.ProjectCard]: {
      [LocationType.ProjectCardsDeck]: hideItemId,
      [LocationType.PlayerValidatedProjectCardsPile]: hideItemId,
    }
  }

  giveTime(): number {
    return 60
  }
}