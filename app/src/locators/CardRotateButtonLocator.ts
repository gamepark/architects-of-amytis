/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { LocationContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { CardRotateButton } from './component/CardRotateButton'
import { projectCardsDisplayLocator } from './ProjectCardsDisplayLocator'
import { playerProjectCardsSpotLocator } from './PlayerProjectCardsSpotLocator'

class CardRotateButtonLocator extends Locator {
  locationDescription = new CardRotateButtonDescription()

  getCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number>): Partial<Coordinates> {
    const card = context.rules.material(MaterialType.ProjectCard).getItem(location.parent!)
    const rotation = card.location.rotation % 360
    switch (rotation) {
      case 0:
        return { x: 3, y: -3, z: 5 }
      case 90:
        return { x: -3, y: -3, z: 5 }
      case 180:
        return { x: -3, y: 3, z: 5 }
      case 270:
        return { x: 3, y: 3, z: 5 }
      default:
        return { x: 3, y: -3, z: 5 }
    }
  }
  
  getLocations(context: MaterialContext) {
    const { rules } = context
    const visibleCards = rules.material(MaterialType.ProjectCard)
                              .location((location) => location.type == LocationType.ProjectCardsDisplay || 
                                                      (location.type == LocationType.PlayerProjectCardsSpot && location.player == rules.players[0]))
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