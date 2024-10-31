import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api';
import { RuleId } from './RuleId'
import { LocationType } from '../material/LocationType';
import { MaterialType } from '../material/MaterialType';
import { BoardHelper } from './helpers/BoardHelper';

export class RetrieveArchitectsRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove [] = []
    const architectsAligned = new BoardHelper(this.game, this.player).areArchitectsAligned()

    if (architectsAligned || this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).id(this.player).getQuantity() == 0) {
      moves.push(...this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).id(this.player).moveItems(
        {
          type: LocationType.PlayerArchitectsSupply,
          player: this.player
        },
      ))
    }
    moves.push(this.startRule(RuleId.ChooseBuildingTile))

    return moves
  }

}