import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'

export enum CustomMoveType {
  Validate = 1, Score
}

export type ScoreData = {
  player: PlayerColor
  points: number
  item: { type: MaterialType, indexes: number[] }
}