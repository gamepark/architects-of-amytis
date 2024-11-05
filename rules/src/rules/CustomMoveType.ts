import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'

export enum CustomMoveType {
  Score = 1
}

export type ScoreData = {
  player: PlayerColor
  points: number
  item: { type: MaterialType, indexes: number[] }
}