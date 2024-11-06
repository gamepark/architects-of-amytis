import { Material, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { range } from 'lodash'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class BoardHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player?: number) {
    super(game)
  }

  areArchitectsAligned() {
    const architects = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).id(this.player).getItems()
    if (architects.length < 3) {
      return false // Not enough for a line
    }
    const architectsMatrix = range(0, 3).map(_ => range(0, 3).map(_ => false))
    for (const architect of architects) {
      architectsMatrix[architect.location.y!][architect.location.x!] = true
    }
    return architectsMatrix.some(line => line.every(y => y))
      || range(0, 3).some(y => architectsMatrix.every(line => line[y]))
      || range(0, 3).every(i => architectsMatrix[i][i])
      || range(0, 3).every(i => architectsMatrix[i][2 - i])
  }

  getVisibleTilesInStack(tilesInBoard: Material): Material {
    const items = tilesInBoard.getItems()
    return tilesInBoard.location(l => !items.some(item => item.location.x === l.x && item.location.y === l.y && item.location.z! > l.z!))
  }

  incrementScoreForPlayer(player: number, points: number) {
    if (points === 0) return []
    const score = this.remind(Memory.Score)
    const moves = []

    score[player] += points
    this.memorize(Memory.Score, score)

    moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreBoardSpace).id(player).moveItem({
      type: LocationType.ScoreBoardSpace,
      x: score[player] % 50
    }))

    // If the new score passed a 50 range, move the range pawn
    if (score[player] % 50 < (score[player] - points) % 50) {
      const posX = Math.floor(score[player] / 50) % 4
      moves.push(this.material(MaterialType.Pawn).location(LocationType.ScoreRangeAreaSpace).id(player).moveItem({
        player: player,
        type: LocationType.ScoreRangeAreaSpace,
        x: posX < 4 ? posX : 4
      }))
    }

    return moves
  }

}

export const Corners = [
  { x: 0, y: 0 },
  { x: 0, y: 2 },
  { x: 2, y: 0 },
  { x: 2, y: 2 }
]

