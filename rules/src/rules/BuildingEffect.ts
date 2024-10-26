import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { BuildingCardSide, BuildingType, getBuildingColor, getBuildingType } from "../material/Building"
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";
import { BoardHelper, Corners } from "./helpers/BoardHelper";

interface BuildingAction {
  getEffectMoves(side: number, move?: ItemMove): MaterialMove[]
  addSideBPoints?(): MaterialMove[]
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
    const score = this.remind(Memory.Score)
    const moves = []

    score[this.player] += points
    this.memorize(Memory.Score, score)

    moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreBoardSpace).player(this.player).moveItem({
        player: this.player,
        type: LocationType.ScoreBoardSpace,
        x: score[this.player] % 50
    }))

    // If the new score passed a 50 range, move the range pawn
    if (score[this.player] % 50 < (score[this.player] - points) % 50) {
      const posX = Math.floor(score[this.player] / 50) % 4
      moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreRangeAreaSpace).player(this.player).moveItem({
        player: this.player,
        type: LocationType.ScoreRangeAreaSpace,
        x: posX < 4 ? posX : 4
      }))
    }

    return moves;
  }
}

class GardenAction extends TileAction implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove): MaterialMove[] {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const destinationStackSize = playerTilesInStack.location(location => location.x === move.location.x && location.y === move.location?.y).getQuantity()
      let points = 0

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

      return this.incrementScore(points);
    }
    
    return []
  }
}

class MarketAction extends TileAction implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove): MaterialMove[] {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      const movedTileColor = getBuildingColor(playerTilesInStack.index(move.itemIndex).getItem()?.id)
      let points = 0

      if (side === BuildingCardSide.SideA) {
        points = topTiles.filter(tile => getBuildingColor(tile.id) === movedTileColor).length * 2
      } else {
        points = topTiles.filter(tile => getBuildingColor(tile.id) !== movedTileColor).length
      }

      return this.incrementScore(points);
    }

    return []
  }
}

class WallAction extends TileAction implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove): MaterialMove[] {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      let points = 0
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

      return this.incrementScore(points);
    }

    return []
  }
}

class PalaceAction extends TileAction implements BuildingAction {
  getEffectMoves(side: number, _move?: ItemMove): MaterialMove[] {
    const points = side === BuildingCardSide.SideA ? this.sideAPoints : this.sideBPoints
    return this.incrementScore(points);
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
  getEffectMoves(side: number, move?: ItemMove): MaterialMove[] {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)      
      let points = 0
  
      if (side === BuildingCardSide.SideA) {
        points = new Set(topTiles.getItems().map(tile => getBuildingType(tile?.id))).size
      } else {
        points = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Residence || getBuildingType(tile.id) === BuildingType.Market).length * 2
      }

      return this.incrementScore(points);
    }

    return []
  }
}

class TheaterAction extends TileAction implements BuildingAction {
  getEffectMoves(side: number, _move?: ItemMove): MaterialMove[] {
    let points = 0
    if (side === BuildingCardSide.SideA) {
      points = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getQuantity()
    } else {
      points = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).player(this.player).getQuantity() * 2
    }

    return this.incrementScore(points);
  }
}