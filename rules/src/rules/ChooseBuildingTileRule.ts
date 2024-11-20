import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { range } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
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
    if (isMoveItemType(MaterialType.BuildingTile)(move) && move.location.type === LocationType.PlayerBoardStackSpace) {
      this.memorize(Memory.PlacedTile, move.itemIndex)
      this.memorize(Memory.PlacedTileOrigin, this.material(MaterialType.BuildingTile).getItem(move.itemIndex).location)
      return [this.startRule(RuleId.ValidateBuilding)]
    }
    return []
  }
}