import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseBuildingTileRule extends PlayerTurnRule {

  getPlayerMoves() {
    return this.availableTiles.moveItems({
      type: LocationType.PlayerHand,
      player: this.player
    })
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

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move) && move.location.type === LocationType.PlayerHand) {
      const location = this.material(MaterialType.BuildingTile).getItem(move.itemIndex).location
      const tileBelow = this.material(MaterialType.BuildingTile)
        .location(LocationType.MainBoardStackSpace)
        .location(l => l.type === location.type && l.x === location.x && l.y === location.y && l.z !== location.z)
        .maxBy(l => l.location.z!)
      if (tileBelow.length) {
        moves.push(tileBelow.rotateItem(false))
      }
      moves.push(this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(location))
      moves.push(this.startRule(RuleId.PlaceBuildingTile))
    }
    return moves
  }
}