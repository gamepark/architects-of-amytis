import { PlayerTurnRule } from '@gamepark/rules-api';
import { Memory } from './Memory';

export class EndGameScoreRule extends PlayerTurnRule {

  onRuleStart() {
    console.log("End game")
    console.log(this.remind(Memory.Score))
    
    return [this.endGame()]
  }

}