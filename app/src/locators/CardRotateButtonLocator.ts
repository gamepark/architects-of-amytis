/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
// import { RuleId } from '@gamepark/architects-of-amytis/rules/RuleId'
import { LocationContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { CardRotateButton } from './component/CardRotateButton'
import { projectCardsDisplayLocator } from './ProjectCardsDisplayLocator'
// import { riverLocator } from './RiverLocator'

class CardRotateButtonLocator extends Locator {
  locationDescription = new CardRotateButtonDescription()

  coordinates = { x: 2.5, y: -2.5, z: 5 }

  getLocations(context: MaterialContext) {
    const { rules } = context
    // const rule = rules.game.rule
    // const canBuyCard = rule?.player === player && (rule?.id === RuleId.SpendKey || rule?.id === RuleId.BuyCard)
    // if (!canBuyCard) return []
    // const messenger = rules.material(MaterialType.MessengerPawn).getItem()!.location.id
    // const riverCards = rules.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay).locationId(messenger)
    const riverCards = rules.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDisplay)
    return riverCards.getIndexes()
      .map((index) => ({
        type: LocationType.CardRotate,
        parent: index
      }))
  }

  placeLocation(location: Location, context: LocationContext): string[] {
    const { rules } = context
    const card = rules.material(MaterialType.ProjectCard).getItem(location.parent!)!

    return [
      ...projectCardsDisplayLocator.placeItem(card, { ...context, type: MaterialType.ProjectCard, index: location.parent!, displayIndex: location.parent! }),
      ...super.placeLocation(location, context)
    ]
  }
}

class CardRotateButtonDescription extends LocationDescription {
  height = 1.5
  width = 1.5
  borderRadius = 1
  extraCss = css`pointer-events: auto !important;`

  content = CardRotateButton

}

export const cardRotateButtonLocator = new CardRotateButtonLocator()