import { MaterialType } from '../material/MaterialType'

export enum CustomMoveType {
  Score = 1
}

export type ScoreData = {
  points: number
  item: { type: MaterialType, index: number }
}