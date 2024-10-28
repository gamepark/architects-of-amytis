/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { LocationContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { CardRotateButton } from './component/CardRotateButton'
import { projectCardsDisplayLocator } from './ProjectCardsDisplayLocator'
import { playerProjectCardsSpotLocator } from './PlayerProjectCardsSpotLocator'

class CardRotateButtonLocator extends Locator {
  locationDescription = new CardRotateButtonDescription()

  coordinates = { x: 3, y: -3, z: 5 }

  getLocations(context: MaterialContext) {
    const { rules } = context
    const visibleCards = rules.material(MaterialType.ProjectCard).location((location) => location.type == LocationType.ProjectCardsDisplay || location.type == LocationType.PlayerProjectCardsSpot)
    return visibleCards.getIndexes()
      .map((index) => ({
        type: LocationType.CardRotate,
        parent: index
      }))
  }

  placeLocation(location: Location, context: LocationContext): string[] {
    const { rules } = context
    const card = rules.material(MaterialType.ProjectCard).getItem(location.parent!)!
    const cardLocator = card.location.type == LocationType.ProjectCardsDisplay ? projectCardsDisplayLocator : playerProjectCardsSpotLocator
    return [
      ...cardLocator.placeItem(card, { ...context, type: MaterialType.ProjectCard, index: location.parent!, displayIndex: location.parent! }),
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