import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { BuildingType, getBuildingColor, getBuildingType } from "../material/Building";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { BuildingCardSide } from "../material/BuildingCard";
import { Memory } from "./Memory";
import { BoardHelper } from "./helpers/BoardHelper";

interface BuildingAction {
  getEffectMoves(side: number, move?: ItemMove): MaterialMove[];
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
      if (side === BuildingCardSide.SideA) {
        const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
        const destinationStackLength = playerTilesInStack.filter(item => item.location.x === move.location.x && item.location.y === move.location?.y).length
        let newScore = 0
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            if (playerTilesInStack.filter(item => item.location.x === x && item.location.y === y).length === destinationStackLength) {
              newScore++
            }
          }
        }
        const score = this.remind(Memory.Score)
        score[this.player] += newScore
        this.memorize(Memory.Score, score)

        console.log("Player got " + newScore + " points for Garden")
        console.log(score)
      } else {
        
      }
    }
    return []
  }
}

class MarketAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      if (side === BuildingCardSide.SideA) {
        const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
        const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
        const movedTileColor = getBuildingColor(playerTilesInStack.index(move.itemIndex).getItem()?.id)

        const newScore = topTiles.filter(tile => getBuildingColor(tile.id) === movedTileColor ).length * 2
        const score = this.remind(Memory.Score)
        score[this.player] += newScore
        this.memorize(Memory.Score, score)

        console.log("Player got " + newScore + " points for Market")
        console.log(score)
      }
    } else {

    }
    return []
  }
}

class WallAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      if (side === BuildingCardSide.SideA) {
        const playerTilesInStack = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
        const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
               
        const newScore = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Wall &&
                                        (tile.location.x !== 1 || tile.location.y !== 1)).length
        const score = this.remind(Memory.Score)
        score[this.player] += newScore
        this.memorize(Memory.Score, score)

        console.log("Player got " + newScore + " points for Walls")
        console.log(score)
      } else {

      }
    }
    return []
  }
}

class PalaceAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, _move?: ItemMove) {
    if (side === BuildingCardSide.SideA) {
      const playerTilesInStack = this.material(MaterialType.BuildingTile)
                            .location(LocationType.PlayerBoardStackSpace)
                            .player(this.player)
                            // .getItems()
      const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)
      
      const newScore = topTiles.filter(tile => getBuildingType(tile.id) === BuildingType.Palace).length
      const score = this.remind(Memory.Score)
      score[this.player] += newScore
      this.memorize(Memory.Score, score)

      console.log("Player got " + newScore + " points for Palace")
      console.log(score)
    } else {

    }
    return []
  }
}

class ResidenceAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, move?: ItemMove) {
    if (move && isMoveItemType(MaterialType.BuildingTile)(move)) {
      if (side === BuildingCardSide.SideA) {
        const playerTilesInStack = this.material(MaterialType.BuildingTile)
                              .location(LocationType.PlayerBoardStackSpace)
                              .player(this.player)
                              // .getItems()
        const topTiles = new BoardHelper(this.game).getVisibleTilesInStack(playerTilesInStack)      
        
        const newScore = new Set(topTiles.getItems().map(tile => getBuildingType(tile?.id))).size
        const score = this.remind(Memory.Score)
        score[this.player] += newScore
        this.memorize(Memory.Score, score)

        console.log("Player got " + newScore + " points for Residence")
        console.log(score)
      } else {

      }
    }
    return []
  }
}

class TheaterAction extends PlayerTurnRule implements BuildingAction {
  getEffectMoves(side: number, _move?: ItemMove) {
    if (side === BuildingCardSide.SideA) {
      const newScore = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).getQuantity()
      const score = this.remind(Memory.Score)
      score[this.player] += newScore
      this.memorize(Memory.Score, score)

      console.log("Player got " + newScore + " points for Theater")
      console.log(score)
    } else {

    }
    return []
  }
}