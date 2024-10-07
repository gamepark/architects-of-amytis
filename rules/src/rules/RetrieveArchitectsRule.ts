import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api';
import { RuleId } from './RuleId'
import { LocationType } from '../material/LocationType';
import { MaterialType } from '../material/MaterialType';
import { MainBoardHelper } from './helpers/MainBoardHelper';

export class RetrieveArchitectsRule extends PlayerTurnRule {
  onRuleStart() {
    console.log("Entering retrieve architects start")

    const moves: MaterialMove [] = []
    const architectsAligned = new MainBoardHelper(this.game, this.player).areArchitectsAligned()
    if (architectsAligned || this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).getQuantity() == 0) {
      moves.push(...this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).player(this.player).moveItems(
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