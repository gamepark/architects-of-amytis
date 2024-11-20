import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { range } from 'lodash'
import { BuildingCardSide, BuildingType, getBuildingType } from '../material/Building'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuildingRules } from './BuildingRule'
import { CustomMoveType, ScoreData } from './CustomMoveType'
import { BoardHelper } from './helpers/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseBuildingTileRule extends PlayerTurnRule {

  getPlayerMoves() {
    return this.availableSpaces.flatMap(location => this.availableTiles.moveItems(location))
  }

  get availableTiles() {
    const architects = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getItems()
    const tiles = this.material(MaterialType.BuildingTile).location(LocationType.MainBoardStackSpace)
    const tileItems = tiles.getItems()
    return tiles.location(l =>
      !architects.some(item => item.location.x === l.x && item.location.y === l.y)
      && !tileItems.some(item => item.location.x === l.x && item.location.y === l.y && item.location.z! > l.z!)
    )
  }

  get availableSpaces() {
    return range(0, 3).flatMap(x => range(0, 3).map(y => ({ type: LocationType.PlayerBoardStackSpace, player: this.player, x, y })))
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move) && move.location.type === LocationType.PlayerBoardStackSpace) {
      this.memorize(Memory.PlacedTile, move.itemIndex)
      const location = this.material(MaterialType.BuildingTile).getItem(move.itemIndex).location
      const tileBelow = this.material(MaterialType.BuildingTile)
        .location(LocationType.MainBoardStackSpace)
        .location(l => l.type === location.type && l.x === location.x && l.y === location.y && l.z !== location.z)
        .maxBy(l => l.location.z!)
      if (tileBelow.length) {
        moves.push(tileBelow.rotateItem(false))
      }
      moves.push(this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(location))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move) && move.location.type === LocationType.PlayerBoardStackSpace) {
      this.memorize(Memory.PlacedTile, move.itemIndex)
      const buildingType = getBuildingType(this.material(MaterialType.BuildingTile).getItem(move.itemIndex).id)
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
    }
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Score) {
      return new BoardHelper(this.game).incrementScoreForPlayer(move.data.player, move.data.points)
    }
    return []
  }
}