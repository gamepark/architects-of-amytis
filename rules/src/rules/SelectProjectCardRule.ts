import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from "@gamepark/rules-api"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { RuleId } from "./RuleId"
import { BuildingEffect } from "./BuildingEffect"
import { BuildingCardSide, BuildingType } from "../material/Building"
import { Memory } from "./Memory"
import { CustomMoveType } from "./CustomMoveType"

export class SelectProjectCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const availableCards = this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay)
    moves.push(...availableCards.moveItems({ type: LocationType.PlayerProjectCardsSpot, player: this.player, rotation: 0 }))
    const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
    moves.push(...projectCardsDeck.deal({ type: LocationType.PlayerProjectCardsSpot, player: this.player, rotation: 0 }, 1))
    if (this.palaceCardSide == BuildingCardSide.SideB) {
      moves.push(this.customMove(CustomMoveType.Score))
    }

    return moves
  }

  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number>[] {
    const moves = []
    if (isMoveItemType(MaterialType.ProjectCard)(move) && move.location.type !== LocationType.ProjectCardsDisplay) {
      if (this.palaceCardSide === BuildingCardSide.SideA) {
        moves.push(...BuildingEffect.createBuildingAction(this.game, BuildingType.Palace).getEffectMoves(this.palaceCardSide))
      }

      if (this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay).getQuantity() < 3) {
        const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
        moves.push(...projectCardsDeck.deal({ type: LocationType.ProjectCardsDisplay, rotation: 0 }, 1))
      }

      moves.push(this.startRule(RuleId.CheckProjects))
    }

    return moves
  }  

  onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove<number, number, number>[] {
    if (move.type === CustomMoveType.Score) {
      return [
              ...BuildingEffect.createBuildingAction(this.game, BuildingType.Palace).getEffectMoves(this.palaceCardSide),
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