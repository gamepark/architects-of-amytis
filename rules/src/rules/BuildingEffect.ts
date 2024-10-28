import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { BuildingCardSide, BuildingType, getBuildingColor, getBuildingType } from "../material/Building"
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { BoardHelper, Corners } from "./helpers/BoardHelper";

interface BuildingAction {
  getBuildingPoints(side: number, move?: ItemMove): number
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
    }
  }

}

abstract class TileAction extends PlayerTurnRule {
  incrementScore(points: number) {
    return new BoardHelper(this.game).incrementScoreForPlayer(this.player, points)
  }

  getEffectMoves(side: number, move?: ItemMove): MaterialMove[] {
    const points = this.getBuildingPoints(side, move)
    return this.incrementScore(points)
  }

  abstract getBuildingPoints(side: number, move?: ItemMove): number

}

class GardenAction extends TileAction implements BuildingAction {
  getBuildingPoints(side: number, move?: ItemMove): number {
    let points = 0
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const destinationStackSize = playerTilesInStack.location(location => location.x === move.location.x && location.y === move.location?.y).getQuantity()

      if (side === BuildingCardSide.SideA) {
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            if (playerTilesInStack.location(location => location.x === x && location.y === y).getQuantity() === destinationStackSize) {
              points++
            }
          }
        }        
      } else {
        points = destinationStackSize * 2
      }
    }
    
    return points
  }
}

class MarketAction extends TileAction implements BuildingAction {
  getBuildingPoints(side: number, move?: ItemMove): number {
    let points = 0
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      const movedTileColor = getBuildingColor(playerTilesInStack.index(move.itemIndex).getItem()?.id)

      if (side === BuildingCardSide.SideA) {
        points = topTiles.filter(tile => getBuildingColor(tile.id) === movedTileColor).length * 2
      } else {
        points = topTiles.filter(tile => getBuildingColor(tile.id) !== movedTileColor).length
      }
    }

    return points
  }
}

class WallAction extends TileAction implements BuildingAction {
  getBuildingPoints(side: number, move?: ItemMove): number {
    let points = 0
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      if (side === BuildingCardSide.SideA) {
        points = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Wall &&
                                        (tile.location.x !== 1 || tile.location.y !== 1)).length
      } else {
        let wallsInCorners = 0

        Corners.forEach(corner => {
          const cornerTile = topTiles.location(location => location.x === corner.x && location.y === corner.y).getItem()
          if (getBuildingType(cornerTile?.id) === BuildingType.Wall) {
            wallsInCorners++
          }
        })

        switch(wallsInCorners) {
          case 1:
            points = 1
            break          
          case 2:
            points = 4
            break          
          case 3:
            points = 8
            break          
          case 4:
            points = 10
            break
        }
      }
    }

    return points
  }
}

class PalaceAction extends TileAction implements BuildingAction {
  getBuildingPoints(side: number, _move?: ItemMove): number {
    return side === BuildingCardSide.SideA ? this.sideAPoints : this.sideBPoints
  }

  get sideAPoints() {
    const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
    const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
    return topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Palace).length
  }

  get sideBPoints() {
    return this.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).getQuantity()
  }

}

class ResidenceAction extends TileAction implements BuildingAction {
  getBuildingPoints(side: number, move?: ItemMove): number {
    let points = 0
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)      
  
      if (side === BuildingCardSide.SideA) {
        points = new Set(topTiles.getItems().map(tile => getBuildingType(tile?.id))).size
      } else {
        points = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Residence || getBuildingType(tile.id) === BuildingType.Market).length * 2
      }
    }

    return points
  }
}

class TheaterAction extends TileAction implements BuildingAction {
  getBuildingPoints(side: number, _move?: ItemMove): number {
    let points = 0
    if (side === BuildingCardSide.SideA) {
      points = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getQuantity()
    } else {
      points = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).player(this.player).getQuantity() * 2
    }

    return points
  }
}