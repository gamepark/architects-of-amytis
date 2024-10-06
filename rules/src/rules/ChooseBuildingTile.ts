import { PlayerTurnRule } from '@gamepark/rules-api'

export class ChooseBuildingTile extends PlayerTurnRule {
  getPlayerMoves() {
    console.log("retrieving player moves in choose building tile")
    return []
  }

  onRuleStart() {
    console.log("Entering rule start..")
    return []
  }

  onRuleEnd() {
    console.log("Entering rule end")
    return []
  }

}