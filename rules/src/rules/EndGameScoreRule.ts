import { PlayerTurnRule } from '@gamepark/rules-api';
import { Memory } from './Memory';
import { PlayerColor, playerColors } from '../PlayerColor';
import { MaterialType } from '../material/MaterialType';
import { LocationType } from '../material/LocationType';
import { Project, projectsProperties } from "../material/Project";
import { FavorType } from '../material/FavorType';
import { Corners } from './helpers/BoardHelper';

export class EndGameScoreRule extends PlayerTurnRule {

  onRuleStart() {
    console.log("End game")

    let score = this.remind(Memory.Score)
    const moves = []
    
    // Compute projects score
    for (const player of playerColors) {
      const validatedProjects = this.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).player(player)
      validatedProjects.getItems().forEach(projectCard => {
        // This control shouldn't be necessary. I don't know why it enters here again and the objects don't have an id
        if (projectCard.id !== undefined) {
          score[player] += projectsProperties[projectCard?.id as Project].points
        }
      })
    }

    // Compute favors score
    for (const player of playerColors) {
      const playerFavors = this.material(MaterialType.Pawn).location(LocationType.FavorBoardSpace).player(player).getItems()
      playerFavors.forEach(pawn => {
        if (pawn.location.x ?? Infinity < FavorType.PawnsInBottomRow) {
          score[player] += this.getFavorScore(player, pawn.location.x)
        }
      })
      
      if (playerFavors.some(favor => favor.location.x ?? 0 >= FavorType.PawnsInBottomRow)) {
        score[player] += this.getFavorScore(player, FavorType.PawnsInBottomRow)
      }
    }

    console.log(score)
    
    // Moving pawns in the score board
    for (const player of playerColors) {
      moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreBoardSpace).player(player).moveItem({
        player: player,
        type: LocationType.ScoreBoardSpace,
        x: score[player] % 50
      }))

      const posX = Math.floor(score[player] / 50) % 4
      moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreRangeAreaSpace).player(player).moveItem({
        player: player,
        type: LocationType.ScoreRangeAreaSpace,
        x: posX < 4 ? posX : 4
      }))
    }

    moves.push(this.endGame())
    
    return moves
  }

  getFavorScore(player: PlayerColor, space: number | undefined) {
    let score = 0

    switch (space) {
      case FavorType.OneInStack:
        score = this.countStacksSize(player, 1) * 3
        break
      case FavorType.TwoInStack:
        score = this.countStacksSize(player, 2) * 2
        break
      case FavorType.ThreeInStack:
        score = this.countStacksSize(player, 3) * 4
        break
      case FavorType.FourInStack:
        score = this.countStacksSize(player, 4) * 6
        break
      case FavorType.Staircase:
        score = this.countStairs(player) * 6
        break
      case FavorType.ThreeInCorner:
        score = this.countCorners(player) * 5
        break
      case FavorType.ProjectsValidated:
        score = this.countValidatedProjects(player) * 2
        break
      case FavorType.PawnsInBottomRow:
        score = this.pawnsInBottomRowScore(player)
        break

    }

    return score
  }

  countStacksSize(player: PlayerColor, size: number): number {
    let totalStacks = 0
    const playerTiles = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(player)

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (playerTiles.location(location => location.x === x && location.y === y).getQuantity() === size) {
          totalStacks++
        }
      }
    }
    return totalStacks
  }

  countStairs(player: PlayerColor): number {
    let count = 0
    const playerTiles = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(player)

    // Stairs in rows
    for (let x = 0; x < 3; x++) {
      const cellTiles = []
      cellTiles[0] = playerTiles.location(location => location.x === x && location.y === 0).getQuantity()
      cellTiles[1] = playerTiles.location(location => location.x === x && location.y === 1).getQuantity()
      cellTiles[2] = playerTiles.location(location => location.x === x && location.y === 2).getQuantity()
      if (this.isStair(cellTiles[0], cellTiles[1], cellTiles[2])) {
        count++
      }
    }
  
    // Stairs in columns
    for (let y = 0; y < 3; y++) {
      const cellTiles = []
      cellTiles[0] = playerTiles.location(location => location.x === 0 && location.y === y).getQuantity()
      cellTiles[1] = playerTiles.location(location => location.x === 1 && location.y === y).getQuantity()
      cellTiles[2] = playerTiles.location(location => location.x === 2 && location.y === y).getQuantity()
      if (this.isStair(cellTiles[0], cellTiles[1], cellTiles[2])) {
        count++
      }
    }
  
    return count
  }
  
  private isStair(a: number, b: number, c: number): boolean {
    return (a === 1 && b === 2 && c === 3) || (a === 3 && b === 2 && c === 1)
  }

  countCorners(player: PlayerColor): number {
    let count = 0
    // const corners = [{x:0, y:0}, {x:0, y:2}, {x:2, y:0}, {x:2, y:2}]
    const playerTiles = this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(player)
    Corners.forEach(corner => {
      if (playerTiles.location(location => location.x === corner.x && location.y === corner.y).getQuantity() >= 3) {
        count++
      }
    })

    return count
  }

  countValidatedProjects(player: PlayerColor): number {
    return this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay).player(player).getQuantity()
  }

  pawnsInBottomRowScore(player: PlayerColor): number {
    let points = 0
    const favorsInBottomRow = this.material(MaterialType.Pawn)
                                  .location(LocationType.FavorBoardSpace)
                                  .player(player)
                                  .location(location => location.x !== undefined && location.x >= FavorType.PawnsInBottomRow)
                                  .getQuantity()

    switch (favorsInBottomRow) {
      case 1:
        points = 4
        break
      case 2:
        points = 10
        break
      case 3:
        points = 18
        break
      case 4:
      case 5: // Doesn't get points, but the player could have placed all the pawns in the bottom row
        points = 30
        break
    }

    return points
  }
  
}