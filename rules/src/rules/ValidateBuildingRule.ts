import { CustomMove, isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BuildingCardSide, BuildingType, getBuildingType } from '../material/Building'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuildingRules } from './BuildingRule'
import { CustomMoveType, ScoreData } from './CustomMoveType'
import { BoardHelper } from './helpers/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ValidateBuildingRule extends PlayerTurnRule {

  getPlayerMoves() {
    return [this.customMove(CustomMoveType.Validate)]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Validate) {
      return this.validate()
    }
    if (move.type === CustomMoveType.Score) {
      return new BoardHelper(this.game).incrementScoreForPlayer(move.data.player, move.data.points)
    }
    return []
  }

  validate() {
    const moves: MaterialMove[] = []
    const location = this.remind<Location>(Memory.PlacedTileOrigin)
    const tileBelow = this.material(MaterialType.BuildingTile)
      .location(LocationType.MainBoardStackSpace)
      .location(l => l.type === location.type && l.x === location.x && l.y === location.y && l.z !== location.z)
      .maxBy(l => l.location.z!)
    if (tileBelow.length) {
      moves.push(tileBelow.rotateItem(false))
    }
    moves.push(this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(location))

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Architect)(move)) {
      const moves: MaterialMove[] = []
      const tile = this.remind<number>(Memory.PlacedTile)
      const buildingType = getBuildingType(this.material(MaterialType.BuildingTile).getItem(tile).id)
      if (buildingType !== BuildingType.Palace) {
        const buildingCardSide = this.remind(Memory.BuildingCardsSides)[buildingType] as BuildingCardSide
        const buildingRule = new BuildingRules[buildingType][buildingCardSide](this.game)
        const scoreData: ScoreData = {
          player: this.player,
          points: buildingRule.score,
          item: { type: MaterialType.BuildingTile, indexes: [this.remind(Memory.PlacedTile)] }
        }
        moves.push(this.customMove(CustomMoveType.Score, scoreData))
        moves.push(this.startRule(RuleId.CheckProjects))
      } else {
        moves.push(this.startRule(RuleId.SelectProjectCard))
      }
      return moves
    }
    return []
  }
}