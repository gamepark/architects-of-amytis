import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { FavorType } from '../material/FavorType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Project, projectsProperties } from '../material/Project'
import { PlayerColor, playerColors } from '../PlayerColor'
import { CustomMoveType, ScoreData } from './CustomMoveType'
import { BoardHelper, Corners } from './helpers/BoardHelper'

export class EndGameScoreRule extends PlayerTurnRule {

  onRuleStart() {
    const moves: MaterialMove[] = []

    // Compute projects score
    for (const player of playerColors) {
      const validatedProjects = this.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).player(player)
      for (const [index, projectCard] of validatedProjects.entries) {
        const scoreData: ScoreData = {
          player,
          points: projectsProperties[projectCard.id as Project].points,
          item: { type: MaterialType.ProjectCard, indexes: [index] }
        }
        moves.push(this.customMove(CustomMoveType.Score, scoreData))
      }
    }

    // Compute favors score
    for (const player of playerColors) {
      const playerFavors = this.material(MaterialType.Pawn).location(LocationType.FavorBoardSpace).id(player)

      for (const [index, pawn] of playerFavors.entries) {
        if (pawn.location.id !== FavorType.PawnsInBottomRow) {
          const scoreData: ScoreData = {
            player,
            points: this.getFavorScore(player, pawn.location.id),
            item: { type: MaterialType.Pawn, indexes: [index] }
          }
          moves.push(this.customMove(CustomMoveType.Score, scoreData))
        }
      }

      const bottomLinePawns = playerFavors.locationId(FavorType.PawnsInBottomRow)
      if (bottomLinePawns.length) {
        const scoreData: ScoreData = {
          player,
          points: this.getFavorScore(player, FavorType.PawnsInBottomRow),
          item: { type: MaterialType.Pawn, indexes: bottomLinePawns.getIndexes() }
        }
        moves.push(this.customMove(CustomMoveType.Score, scoreData))
      }
    }

    moves.push(this.endGame())

    return moves
  }

  getFavorScore(player: PlayerColor, space: FavorType) {
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
      .id(player)
      .locationId(FavorType.PawnsInBottomRow)
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

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Score) {
      return new BoardHelper(this.game).incrementScoreForPlayer(move.data.player, move.data.points)
    }
    return []
  }
}