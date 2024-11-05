import { DeckLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { projectCardDescription } from '../material/ProjectCardDescription'
import { PlayerValidatedProjectCardsPileHelp } from './component/PlayerValidatedProjectCardsPileHelp'

class PlayerValidatedProjectCardsPileLocator extends DeckLocator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return {
      x: 2.5,
      y: player === location.player ? 16 : -16
    }
  }

  locationDescription = new PlayerValidatedProjectCardsPileDescription(projectCardDescription)
}

class PlayerValidatedProjectCardsPileDescription extends LocationDescription {
  help = PlayerValidatedProjectCardsPileHelp
}

export const playerValidatedProjectCardsPileLocator = new PlayerValidatedProjectCardsPileLocator()