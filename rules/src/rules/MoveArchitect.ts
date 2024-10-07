import { PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory } from './Memory'

export class MoveArchitect extends PlayerTurnRule {

  onRuleStart() {
    const move = [this.material(MaterialType.Architect).location(LocationType.PlayerArchitectsSupply).player(this.player).moveItem(
      this.remind(Memory.MovedTile).location
    )]
    return move
  }

}