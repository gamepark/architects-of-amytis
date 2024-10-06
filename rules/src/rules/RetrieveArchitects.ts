import { PlayerTurnRule } from '@gamepark/rules-api';
import { RuleId } from './RuleId'

export class RetrieveArchitects extends PlayerTurnRule {
  getPlayerMoves() {
    debugger;
    console.log("retrieving player moves in retrieve architects")
    // TODO: Check if architects need to be retrieved
    return[this.startRule(RuleId.ChooseBuildingTile)]
  }

  onRuleStart() {
    console.log("Entering")
    return []
  }

  onRuleEnd() {
    console.log("Entering")
    return []
  }

}