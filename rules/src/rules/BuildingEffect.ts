import { isMoveItemType, ItemMove, Material, MaterialGame, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { BuildingType, getBuildingColor, getBuildingType } from "../material/Building";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";

interface BuildingAction {
  getEffectMoves(move: ItemMove): MaterialMove[];
}

export class BuildingEffect {

  static createBuildingAction(game: MaterialGame, buildingType: BuildingType) {
    switch (buildingType) {
      case BuildingType.Garden:
        return new GardenAction(game);
      case BuildingType.Market:
        return new MarketAction(game);
      case BuildingType.Wall:
        return new WallAction(game);
      case BuildingType.Palace:
        return new PalaceAction(game);
      case BuildingType.Residence:
        return new ResidenceAction(game);
      case BuildingType.Theater:
        return new TheaterAction(game);
      default:
        return null
    }
  }

}

abstract class BuildingEffectAction extends PlayerTurnRule {
  getVisibleTilesInStack(tilesInStack: Material) {
    const topTiles: Material[] = []
    
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const stack = tilesInStack.location(location => location.x === x && location.y === y)
        if (stack.length) {
          topTiles.push(stack.sort(item => -item.location.z!))
        }
      }
    }

    return topTiles
  }
}

class GardenAction extends BuildingEffectAction implements BuildingAction {
  getEffectMoves(move: ItemMove) {
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const destinationStackLength = playerTilesInStack.filter(item => item.location.x === move.location.x && item.location.y === move.location?.y).length
      let score = 0
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (playerTilesInStack.filter(item => item.location.x === x && item.location.y === y).length === destinationStackLength) {
            score++
          }
        }
      }
      console.log("Player got " + score + " points for Garden")
      // TODO: Return score
    }
    return []
  }
}

class MarketAction extends BuildingEffectAction implements BuildingAction {
  getEffectMoves(move: ItemMove) {
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      let score = 0

      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = this.getVisibleTilesInStack(playerTilesInStack)
      const movedTileColor = getBuildingColor(playerTilesInStack.index(move.itemIndex).getItem()?.id)
      score = topTiles.filter(tile => getBuildingColor(tile.getItem()?.id) === movedTileColor ).length * 2
      console.log("Player got " + score + " points for Market")
      // TODO: Return score
    }
    return []
  }
}

class WallAction extends BuildingEffectAction implements BuildingAction {
  getEffectMoves(move: ItemMove) {
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      let score = 0
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = this.getVisibleTilesInStack(playerTilesInStack)
      
      score = topTiles.filter(tile => getBuildingType(tile.getItem()?.id) === BuildingType.Wall &&
                                      (tile.getItem()?.location.x !== 1 || tile.getItem()?.location.y !== 1)).length
      console.log("Player got " + score + " points for Walls")
      // TODO: Return score

    }
    return []
  }
}

class PalaceAction extends BuildingEffectAction implements BuildingAction {
  getEffectMoves(_move: ItemMove) {
    return []
  }
}

class ResidenceAction extends BuildingEffectAction implements BuildingAction {
  getEffectMoves(move: ItemMove) {
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      let score = 0
      const playerTilesInStack = this.material(MaterialType.BuildingTile)
                            .location(LocationType.PlayerBoardStackSpace)
                            .player(this.player)
                            // .getItems()
      const topTiles = this.getVisibleTilesInStack(playerTilesInStack)      
      score = new Set(topTiles.map(tile => getBuildingType(tile.getItem()?.id))).size
      console.log("Player got " + score + " points for Residence")
      // TODO: Return score

    }
    return []
  }
}

class TheaterAction extends BuildingEffectAction implements BuildingAction {
  getEffectMoves(_move: ItemMove) {
    let score = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getQuantity()
    console.log("Player got " + score + " points for Theater")
    return []
  }
}