import { MaterialItem, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Project, projectsProperties } from "../material/Project";
import { BoardHelper } from "./helpers/BoardHelper";
import { BuildingColor, getBuildingColor } from "../material/Building";
import { RuleId } from "./RuleId";

export class CheckProjectsRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    const boardTiles = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.player)
    const visibleTiles = new BoardHelper(this.game, this.player).getVisibleTilesInStack(boardTiles)
    const playerProjects = this.material(MaterialType.ProjectCard).location(LocationType.PlayerProjectCardsSpot).player(this.player).getIndexes()

    const playerBoardColorMatrix = this.getPlayerBoardColorMatrix(visibleTiles.getItems())
    playerProjects.forEach(projectCardIndex => {
      const projectCard = this.material(MaterialType.ProjectCard).index(projectCardIndex)
      let pattern = projectsProperties[projectCard.getItem()?.id as Project].pattern
      for (let i = 0; i < 4; i++) {
        if (this.validateCardPattern(pattern, playerBoardColorMatrix)) {
          moves.push(projectCard.moveItem({
            type: LocationType.PlayerValidatedProjectCardsPile,
            player: this.player
          }))
          break
        } else {
          pattern = this.rotateCard(pattern)
        }
      }
    });
    
    moves.push(this.startRule(RuleId.ClaimKingsFavor))
    return moves
  }

  private getPlayerBoardColorMatrix(playerBoard: MaterialItem[]): (BuildingColor | null)[][] {
    const matrix: (BuildingColor | null)[][] = Array.from({ length: 3 }, () => Array(3).fill(null));
    for (const obj of playerBoard) {
      if (obj.location.x !== undefined && obj.location.y !== undefined) {
        matrix[obj.location.y][obj.location.x] = getBuildingColor(obj.id);
      }
    }

    return matrix;
  }

  rotateCard(card: (BuildingColor | null)[][]): (BuildingColor | null)[][] {
    const rows = card.length;
    const cols = card[0].length;
    const rotatedCard: (BuildingColor | null)[][] = [];
  
    for (let i = 0; i < cols; i++) {
      rotatedCard[i] = [];
      for (let j = 0; j < rows; j++) {
        rotatedCard[i][j] = card[rows - 1 - j][i];
      }
    }
  
    return rotatedCard;
  }

  validateCardPattern(pattern: (BuildingColor | null)[][], playerBoard: (BuildingColor | null)[][]): boolean {
    const patternRows = pattern.length;
    const patternCols = pattern[0].length;  
    const playerBoardRows = 3;
    const playerBoardCols = 3;
  
    for (let i = 0; i <= playerBoardRows - patternRows; i++) {
      for (let j = 0; j <= playerBoardCols - patternCols; j++) {
        let match = true;
  
        // Check if pattern matches this position
        for (let x = 0; x < patternRows; x++) {
          for (let y = 0; y < patternCols; y++) {
            // nulls in the player board work as anything
            if (pattern[x][y] !== null && pattern[x][y] !== playerBoard[i + x][j + y]) {
              match = false;
              break;
            }
          }
          if (!match) break;
        }
  
        if (match) {
          return true;
        }
      }
    }
  
    return false;
  }
 
}