import { Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api';
import { MaterialType } from '../material/MaterialType';
import { LocationType } from '../material/LocationType';
import { BoardHelper } from './helpers/BoardHelper';
import { RuleId } from './RuleId';

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

    const availableSpaces: Location[] = []
    const occupiedSpaces = this.material(MaterialType.Pawn).location(LocationType.FavorBoardSpace).getItems().map(pawn => pawn.location.x)
    for (let x = 0; x < 13; x++) {
      if (!occupiedSpaces.includes(x)) {
        availableSpaces.push({
          type: LocationType.FavorBoardSpace,
          x: x
        })
      }
    }

    moves.push(
      ...availableSpaces.flatMap((space) => {
        return [
          ...pawnsSupply.moveItems(space)
        ]
      })
    )
    return moves
  }

  afterItemMove() {
    return[this.startRule(RuleId.CheckEndGame)]
  }

}