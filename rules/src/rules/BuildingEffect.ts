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
      default:
        return null
    }
  }

}

class GardenAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const destinationStackSize = playerTilesInStack.location(location => location.x === move.location.x && location.y === move.location?.y).getQuantity()
      const score = this.remind(Memory.Score)
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

      score[this.player] += points
      this.memorize(Memory.Score, score)
    }
    
    return []
  }
}

class MarketAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      const movedTileColor = getBuildingColor(playerTilesInStack.index(move.itemIndex).getItem()?.id)
      const score = this.remind(Memory.Score)
      let points = 0

      if (side === BuildingCardSide.SideA) {
        points = topTiles.filter(tile => getBuildingColor(tile.id) === movedTileColor).length * 2
      } else {
        points = topTiles.filter(tile => getBuildingColor(tile.id) !== movedTileColor).length
      }

      score[this.player] += points
      this.memorize(Memory.Score, score)
    }

    return []
  }
}

class WallAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      const score = this.remind(Memory.Score)
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

      score[this.player] += points
      this.memorize(Memory.Score, score)
    }

    return []
  }
}

class PalaceAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, _move?: ItemMove) {
    if (side === BuildingCardSide.SideA) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      
      const newScore = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Palace).length
      const score = this.remind(Memory.Score)
      score[this.player] += newScore
      this.memorize(Memory.Score, score)

      console.log("Player got " + newScore + " points for Palace side A")
      console.log(score)
    }

    return []
  }

  addSideBPoints() {
    const newScore = this.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).getQuantity()
    const score = this.remind(Memory.Score)
    score[this.player] += newScore
    this.memorize(Memory.Score, score)

    console.log("Player got " + newScore + " points for Palace side B")
    console.log(score)

    return []
  }
}

class ResidenceAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)      
      const score = this.remind(Memory.Score)
      let points = 0
  
      if (side === BuildingCardSide.SideA) {      
        points = new Set(topTiles.getItems().map(tile => getBuildingType(tile?.id))).size
      } else {
        points = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Residence || getBuildingType(tile.id) === BuildingType.Market).length * 2
      }

      score[this.player] += points
      this.memorize(Memory.Score, score)
    }

    return []
  }
}

class TheaterAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, _move?: ItemMove) {
    const score = this.remind(Memory.Score)
    let points = 0
    if (side === BuildingCardSide.SideA) {
      points = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getQuantity()
    } else {
      points = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).player(this.player).getQuantity() * 2
    }
    // TODO: Remove this points++ when implementing correctly the sequence to get the tile and place the architect before placing the building
    points++

    score[this.player] += points
    this.memorize(Memory.Score, score)

    return []
  }
}