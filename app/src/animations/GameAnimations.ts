import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when().move(move => isMoveItemType(MaterialType.ProjectCard)(move) && move.location.rotation !== undefined).duration(0.2)