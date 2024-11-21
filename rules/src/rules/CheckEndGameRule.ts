import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class CheckEndGameRule extends PlayerTurnRule {

  onRuleStart() {
    if (this.player !== this.game.players[0] && this.has2EmptyStacks()) {
      return [this.startRule(RuleId.EndGameScore)]
    }
    return [this.startPlayerTurn(RuleId.RetrieveArchitects, this.nextPlayer)]
  }

  has2EmptyStacks() {
    const tiles = this.material(MaterialType.BuildingTile).location(LocationType.MainBoardStackSpace)
    let emptySpaces = 0
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const tilesInStack = tiles.location(location => location.x === x && location.y === y).length
        if (tilesInStack === 0) {
          emptySpaces++
          if (emptySpaces > 1) {
            return true
          }
        }
      }
    }
    return false
  }
}
