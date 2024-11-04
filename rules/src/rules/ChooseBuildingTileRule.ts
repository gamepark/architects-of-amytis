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
    const tileIndexes: number[] = []
    const architects = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getItems()
    const tiles = this.material(MaterialType.BuildingTile).location(LocationType.MainBoardStackSpace)
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (!architects.some(item => item.location.x === x && item.location.y === y)) {
          const stack = tiles.location(location => location.x === x && location.y === y)
          if (stack.length) {
            tileIndexes.push(stack.sort(item => -item.location.z!).getIndex())
          }
        }
      }
    }
    return tiles.index(index => tileIndexes.includes(index))
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move) && move.location.type === LocationType.PlayerHand) {
      const location = this.material(MaterialType.BuildingTile).getItem(move.itemIndex).location
      const deckUnderTile = this.material(MaterialType.BuildingTile)
        .location(LocationType.MainBoardStackSpace)
        .location(l => l.type === location.type && l.x === location.x && l.y === location.y && l.z !== location.z).deck()
      if (deckUnderTile.length) {
        moves.push(deckUnderTile.rotateItem(false))
      }
      moves.push(this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(location))
      moves.push(this.startRule(RuleId.PlaceBuildingTile))
    }
    return moves
  }
}