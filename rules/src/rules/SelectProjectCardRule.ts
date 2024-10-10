import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { RuleId } from "./RuleId"
import { BuildingEffect } from "./BuildingEffect"
import { BuildingType } from "../material/Building"
import { Memory } from "./Memory"

export class SelectProjectCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    console.log("retrieving player moves in select project card")
    const moves: MaterialMove[] = []
    const availableCards = this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay)
    moves.push(...availableCards.moveItems({ type: LocationType.PlayerProjectCardsSpot, player: this.player }))
    const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
    moves.push(...projectCardsDeck.deal({ type: LocationType.PlayerProjectCardsSpot, player: this.player }, 1))

    return moves
  }

  afterItemMove() {
    const buildingCardSide = this.remind(Memory.BuildingCardsSides)[BuildingType.Palace]
    BuildingEffect.createBuildingAction(this.game, BuildingType.Palace)?.getEffectMoves(buildingCardSide)
  
    return [this.startRule(RuleId.CheckProjects)]
  }  

  onRuleEnd() {
    const moves: MaterialMove[] = []
    if (this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay).getQuantity() < 3) {
      const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
      moves.push(...projectCardsDeck.deal({ type: LocationType.ProjectCardsDisplay }, 1))
    }
    return moves    
  }
}