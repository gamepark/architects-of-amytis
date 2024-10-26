import { PlayerTurnRule } from '@gamepark/rules-api';
import { MaterialType } from '../material/MaterialType';
import { RuleId } from './RuleId';
import { LocationType } from '../material/LocationType';
import { Memory } from './Memory';

export class CheckEndGameRule extends PlayerTurnRule {

  onRuleStart() {
    if (this.remind(Memory.LastTurn)) {
      return[this.startRule(RuleId.EndGameScore)]
    } else {
      let emptySpaces = 0
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          const tilesInStack = this.material(MaterialType.BuildingTile)
                                    .location(location => location.type === LocationType.MainBoardStackSpace && location.x === x && location.y === y).getQuantity()
          if (tilesInStack === 0) {
            emptySpaces++
            if (emptySpaces > 1) {
              if (this.material(MaterialType.FirstPlayerCard).player(this.player).getQuantity() === 1) {
                this.memorize(Memory.LastTurn, true)
                return[this.startPlayerTurn(RuleId.RetrieveArchitects, this.nextPlayer)]
              } else {
                return[this.startRule(RuleId.EndGameScore)]
              }
            }
          }
        }
      }
    }

    return[this.startPlayerTurn(RuleId.RetrieveArchitects, this.nextPlayer)]
  }

}