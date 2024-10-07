import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api';
import { RuleId } from './RuleId'
import { LocationType } from '../material/LocationType';
import { MaterialType } from '../material/MaterialType';

export class RetrieveArchitects extends PlayerTurnRule {
  onRuleStart() {
    console.log("Entering retrieve architects start")

    const moves: MaterialMove [] = []
    if (this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).getQuantity() == 0) {
      console.log("0 architects: retrieving them.")
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