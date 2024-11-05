import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BuildingCardSide, BuildingType, getBuildingType } from '../material/Building'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuildingRules } from './BuildingRule'
import { BoardHelper } from './helpers/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlaceBuildingTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    const tile = this.material(MaterialType.BuildingTile).location(LocationType.PlayerHand).player(this.player)
    const availableSpaces: Location[] = []
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        availableSpaces.push({
          type: LocationType.PlayerBoardStackSpace,
          player: this.player,
          x: x,
          y: y
        })
      }
    }
    return availableSpaces.map(space => tile.moveItem(space))
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      const movedTile = this.material(MaterialType.BuildingTile).getItem(move.itemIndex)
      const tilesInStack = this.material(MaterialType.BuildingTile)
                                .location(LocationType.PlayerBoardStackSpace)
                                .location(location => location.x === movedTile.location.x && location.y === movedTile.location.y)
                                .player(this.player)
                                .getQuantity()
      movedTile.location.z = tilesInStack + 1
      if (getBuildingType(movedTile.id) !== BuildingType.Palace) {
        const buildingType = getBuildingType(movedTile.id)
        const buildingCardSide = this.remind(Memory.BuildingCardsSides)[buildingType] as BuildingCardSide
        const buildingRule = new BuildingRules[buildingType][buildingCardSide](this.game, move.itemIndex)
        const pointsMove = new BoardHelper(this.game).incrementScoreForPlayer(this.player, buildingRule.score)
        moves.push(...pointsMove)
        moves.push(this.startRule(RuleId.CheckProjects))
      } else {
        moves.push(this.startRule(RuleId.SelectProjectCard))
      }
    }

    return moves
  }
}