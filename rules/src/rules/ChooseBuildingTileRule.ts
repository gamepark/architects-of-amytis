import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { BuildingEffect } from './BuildingEffect'
import { BuildingType, getBuildingType } from '../material/Building'
import { BuildingCardSide } from '../material/BuildingCard'

export class ChooseBuildingTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    console.log("retrieving player moves in choose building tile")
    const moves: MaterialMove[] = []

    const topTiles = this.availableTiles
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

    moves.push(
      ...availableSpaces.flatMap((space) => {
        return [
          ...topTiles.moveItems(space)
        ]
      })
    )
    return moves
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
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      const movedTile = this.material(MaterialType.BuildingTile).getItem(move.itemIndex)
      this.memorize(Memory.MovedTile, movedTile)
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      const previousLocation = this.remind(Memory.MovedTile).location
      previousLocation.player = this.player
      moves.push(this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(previousLocation))

      const movedTile = this.material(MaterialType.BuildingTile).getItem(move.itemIndex)
      const tilesInStack = this.material(MaterialType.BuildingTile)
                                .location(LocationType.PlayerBoardStackSpace)
                                .location(location => location.x === movedTile.location.x && location.y === movedTile.location.y)
                                .player(this.player)
                                .getQuantity()
      movedTile.location.z = tilesInStack + 1
      if (getBuildingType(movedTile.id) !== BuildingType.Palace) {
        // TODO: Select correct side
        const buildingCardSide = BuildingCardSide.SideA
        BuildingEffect.createBuildingAction(this.game, getBuildingType(movedTile.id))?.getEffectMoves(buildingCardSide, move)
        moves.push(this.startRule(RuleId.CheckProjects))
      } else {
        moves.push(this.startRule(RuleId.SelectProjectCard))
      }
    }

    return moves
  }
}