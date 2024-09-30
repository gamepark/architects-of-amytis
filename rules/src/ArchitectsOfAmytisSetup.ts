import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArchitectsOfAmytisOptions } from './ArchitectsOfAmytisOptions'
import { ArchitectsOfAmytisRules } from './ArchitectsOfAmytisRules'
import { buildings } from './material/Building'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class ArchitectsOfAmytisSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ArchitectsOfAmytisOptions> {
  Rules = ArchitectsOfAmytisRules

  setupMaterial(_options: ArchitectsOfAmytisOptions) {
    this.setupBuildingTiles()
  }

  setupBuildingTiles() {
    this.material(MaterialType.BuildingTile).createItems(buildings.concat(buildings).map((building, index) => ({
      id: building, location: { type: LocationType.MainBoardStackSpace, x: index }
    })))
    this.material(MaterialType.BuildingTile).shuffle()
    const buildingsDeck = this.material(MaterialType.BuildingTile).deck()
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 5; z++) {
          buildingsDeck.dealOne({ type: LocationType.MainBoardStackSpace, x, y, z })
        }
      }
    }
    buildingsDeck.deleteItems()
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.game.players[0])
  }
}