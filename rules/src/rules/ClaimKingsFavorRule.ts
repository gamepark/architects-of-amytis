import { Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api';
import { MaterialType } from '../material/MaterialType';
import { LocationType } from '../material/LocationType';
import { BoardHelper } from './helpers/BoardHelper';
import { RuleId } from './RuleId';

export class ClaimKingsFavorRule extends PlayerTurnRule {
  onRuleStart() {
      const architectsAligned = new BoardHelper(this.game, this.player).areArchitectsAligned()
      // TODO: Remove this occupiedSpaces control when I have all spaces. It's just to be able to continue the game during testing
      const occupiedSpaces = this.material(MaterialType.Pawn).location(LocationType.FavorBoardSpace).getItems().map(pawn => pawn.location.x).length
      if (!architectsAligned || occupiedSpaces === 3) {
        return [this.startPlayerTurn(RuleId.RetrieveArchitects, this.nextPlayer)]
      } else {
        return []
      }
  }

  getPlayerMoves() {
    console.log("retrieving player moves in claim kings favor")
    const moves: MaterialMove[] = []
    const pawnsSupply = this.material(MaterialType.Pawn).location(LocationType.PlayerPawnsSupply).player(this.player)
    const availableSpaces: Location[] = []
    // TODO: Update this when I have all spaces in the final board
    const occupiedSpaces = this.material(MaterialType.Pawn).location(LocationType.FavorBoardSpace).getItems().map(pawn => pawn.location.x)
    for (let x = 0; x < 3; x++) {
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