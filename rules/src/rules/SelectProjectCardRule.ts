import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BuildingCardSide, BuildingType } from '../material/Building'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PalaceARule, PalaceBRule } from './BuildingRule'
import { CustomMoveType } from './CustomMoveType'
import { BoardHelper } from './helpers/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SelectProjectCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const availableCards = this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay)
    moves.push(...availableCards.moveItems({ type: LocationType.PlayerProjectCardsSpot, player: this.player }))
    const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
    moves.push(projectCardsDeck.dealOne({ type: LocationType.PlayerProjectCardsSpot, player: this.player }))
    if (this.palaceCardSide === BuildingCardSide.SideB) {
      moves.push(this.customMove(CustomMoveType.Score))
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = []
    if (isMoveItemType(MaterialType.ProjectCard)(move) && move.location.type !== LocationType.ProjectCardsDisplay) {
      if (this.palaceCardSide === BuildingCardSide.SideA) {
        moves.push(...new BoardHelper(this.game).incrementScoreForPlayer(this.player, new PalaceARule(this.game).score))
      }

      if (this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay).getQuantity() < 3) {
        const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
        moves.push(projectCardsDeck.dealOne({ type: LocationType.ProjectCardsDisplay }))
      }

      moves.push(this.startRule(RuleId.CheckProjects))
    }

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Score) {
      return [
        ...new BoardHelper(this.game).incrementScoreForPlayer(this.player, new PalaceBRule(this.game).score),
        this.startRule(RuleId.CheckProjects)
      ]
    } else {
      return []
    }
  }

  get palaceCardSide() {
    return this.remind(Memory.BuildingCardsSides)[BuildingType.Palace]
  }
}