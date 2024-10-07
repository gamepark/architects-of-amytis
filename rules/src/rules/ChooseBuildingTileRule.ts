import { isMoveItemType, ItemMove, Location, MaterialItem, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseBuildingTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    console.log("retrieving player moves in choose building tile")
    const moves: MaterialMove[] = []
    const tiles = this.tiles
    const locationsWithArchitect = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getItems().map(stack => stack.location)

    const tilesWithoutArchitect = tiles.filter(tile => 
      !locationsWithArchitect.some(location => 
          location.x === tile.location.x && location.y === tile.location.y
      )
    );

    const topTiles = Object.values(
      tilesWithoutArchitect.reduce((acc, item) => {
          const key = `${item.location.x}-${item.location.y}`;
          if (!acc[key] || item.location.z! > acc[key].location.z!) {
              acc[key] = item;
          }
          return acc;
      }, {} as { [key: string]: MaterialItem })
    );

    const topTilesMaterial = this.material(MaterialType.BuildingTile).location(LocationType.MainBoardStackSpace).filter(materialItem => 
      topTiles.some(topTile => 
        materialItem.location.x === topTile.location.x &&
        materialItem.location.y === topTile.location.y &&
        materialItem.location.z === topTile.location.z
      )
    )

    let availableSpaces: Location[] = []
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
          ...topTilesMaterial.moveItems(space)
        ]
      })
    )
    return moves
  }

  get tiles() {
    const mainBoardTiles = this
      .material(MaterialType.BuildingTile)
      .location(LocationType.MainBoardStackSpace)
      .getItems()
    return mainBoardTiles
  }

  beforeItemMove(move: ItemMove, _context: PlayMoveContext) {
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      const movedTile = this.material(MaterialType.BuildingTile).getItem(move.itemIndex)
      this.memorize(Memory.MovedTile, movedTile)
    }

    return []
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      const mainBoardLocation = this.remind(Memory.MovedTile).location
      mainBoardLocation.player = this.player
      moves.push(this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(mainBoardLocation))
      // TODO: Include building effects
      // moves.push(this.startRule(RuleId.RetrieveArchitects))
      moves.push(this.startPlayerTurn(RuleId.RetrieveArchitects, this.nextPlayer))
    }

    return moves
  }
}