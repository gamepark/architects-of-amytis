import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { FavorType, favorTypes } from '../material/FavorType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BoardHelper } from './helpers/BoardHelper'
import { RuleId } from './RuleId'

export class ClaimKingsFavorRule extends PlayerTurnRule {
  onRuleStart() {
      const architectsAligned = new BoardHelper(this.game, this.player).areArchitectsAligned()
      const pawnsSupply = this.material(MaterialType.Pawn).location(LocationType.PlayerPawnsSupply).player(this.player)
      if (!architectsAligned || pawnsSupply.getQuantity() === 0) {
        return[this.startRule(RuleId.CheckEndGame)]
      } else {
        return []
      }
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const pawnsSupply = this.material(MaterialType.Pawn).location(LocationType.PlayerPawnsSupply).player(this.player)

    for (const favorType of favorTypes) {
      const pawnsInFavor = this.material(MaterialType.Pawn).location(LocationType.FavorBoardSpace).locationId(favorType).length
      if (favorType === FavorType.PawnsInBottomRow) {
        if (pawnsInFavor < 6) {
          moves.push(pawnsSupply.moveItem({
            type: LocationType.FavorBoardSpace,
            id: favorType,
            x: pawnsInFavor
          }))
        }
      } else {
        if (!pawnsInFavor) {
          moves.push(pawnsSupply.moveItem({
            type: LocationType.FavorBoardSpace,
            id: favorType
          }))
        }
      }
    }

    return moves
  }

  afterItemMove() {
    return[this.startRule(RuleId.CheckEndGame)]
  }

}