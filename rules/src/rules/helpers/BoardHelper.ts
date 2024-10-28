import { Material, MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { Memory } from "../Memory";

export class BoardHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player?: number) {
    super(game)
  }

  areArchitectsAligned() {
    const architects = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).id(this.player).getItems()
    if (architects.length < 3) {
      return false; // Not enough for a line
    }
  
    // Verify horizontal, vertical and diagonal alignment
    for (let i = 0; i < architects.length - 2; i++) {
      for (let j = i + 1; j < architects.length - 1; j++) {
        for (let k = j + 1; k < architects.length; k++) {
          const obj1 = architects[i];
          const obj2 = architects[j];
          const obj3 = architects[k];
  
          // Horizontal alignment
          if (obj1.location.y === obj2.location.y && obj2.location.y === obj3.location.y) {
            return true;
          }
  
          // Vertical alignment
          if (obj1.location.x === obj2.location.x && obj2.location.x === obj3.location.x) {
            return true;
          }
  
          // Diagonal alignment
          if (
            (obj1.location.x! - obj2.location.x! === obj1.location.y! - obj2.location.y!) && 
            (obj1.location.x! - obj3.location.x! === obj1.location.y! - obj3.location.y!)
          ) {
            return true;
          }
  
          if (
            (obj1.location.x! - obj2.location.x! === -(obj1.location.y! - obj2.location.y!)) &&
            (obj1.location.x! - obj3.location.x! === -(obj1.location.y! - obj3.location.y!))
          ) {
            return true;
          }
        }
      }
    }
  
    return false;
  }

  getVisibleTilesInStack(tilesInBoard: Material) : Material {
    const topTiles: number[] = []
    
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const stack = tilesInBoard.location(location => location.x === x && location.y === y)
        if (stack.length) {
          topTiles.push(stack.sort(item => -item.location.z!).getIndex())
        }
      }
    }

    return tilesInBoard.index(index => topTiles.includes(index))
  }

  incrementScoreForPlayer(player: number, points: number) {
    const score = this.remind(Memory.Score)
    const moves = []

    score[player] += points
    this.memorize(Memory.Score, score)

    moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreBoardSpace).player(player).moveItem({
        player: player,
        type: LocationType.ScoreBoardSpace,
        x: score[player] % 50
    }))

    // If the new score passed a 50 range, move the range pawn
    if (score[player] % 50 < (score[player] - points) % 50) {
      const posX = Math.floor(score[player] / 50) % 4
      moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreRangeAreaSpace).player(player).moveItem({
        player: player,
        type: LocationType.ScoreRangeAreaSpace,
        x: posX < 4 ? posX : 4
      }))
    }

    return moves;
  }

}

export const Corners = [
  {x: 0, y: 0},
  {x: 0, y: 2},
  {x: 2, y: 0},
  {x: 2, y: 2}  
]

