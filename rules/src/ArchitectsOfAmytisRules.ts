import {
  CompetitiveScore,
  FillGapStrategy,
  HiddenMaterialRules,
  hideItemId,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { CheckEndGameRule } from './rules/CheckEndGameRule'
import { CheckProjectsRule } from './rules/CheckProjectsRule'
import { ChooseBuildingTileRule } from './rules/ChooseBuildingTileRule'
import { ClaimKingsFavorRule } from './rules/ClaimKingsFavorRule'
import { EndGameScoreRule } from './rules/EndGameScoreRule'
import { Memory } from './rules/Memory'
import { PlaceBuildingTileRule } from './rules/PlaceBuildingTileRule'
import { RetrieveArchitectsRule } from './rules/RetrieveArchitectsRule'
import { RuleId } from './rules/RuleId'
import { SelectProjectCardRule } from './rules/SelectProjectCardRule'
import { StakingStrategy } from './rules/util/StakingStrategy'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArchitectsOfAmytisRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>,
    CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {

  rules = {
    [RuleId.RetrieveArchitects]: RetrieveArchitectsRule,
    [RuleId.ChooseBuildingTile]: ChooseBuildingTileRule,
    [RuleId.PlaceBuildingTile]: PlaceBuildingTileRule,
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
      [LocationType.PlayerValidatedProjectCardsPile]: new PositiveSequenceStrategy()
    },
    [MaterialType.Pawn]: {
      [LocationType.ScoreBoardSpace]: new StakingStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.BuildingTile]: {
      [LocationType.MainBoardStackSpace]: (item: MaterialItem) => item.location.rotation ? ['id'] : []
    },
    [MaterialType.ProjectCard]: {
      [LocationType.ProjectCardsDeck]: hideItemId
    }
  }

  giveTime(): number {
    return 60
  }

  getScore(player: PlayerColor) {
    return this.remind(Memory.Score, player)
  }
}