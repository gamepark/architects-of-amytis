import { ItemContext, ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { architectDescription } from '../material/ArchitectDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'

class PlayerArchitectsSupplyLocator extends ListLocator {
  gap = { x: 2 }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return {
      x: -mainBoardDescription.width / 2 + architectDescription.width / 2 - 0.4,
      y: player === location.player ? 12 : -12,
      z: 0.1
    }
  }
}

export const playerArchitectsSupplyLocator = new PlayerArchitectsSupplyLocator()