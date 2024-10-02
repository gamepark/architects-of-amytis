import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArchitectsOfAmytisOptions } from './ArchitectsOfAmytisOptions'
import { ArchitectsOfAmytisRules } from './ArchitectsOfAmytisRules'
import { buildings } from './material/Building'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor, playerColors } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { projects } from './material/Project'

/**
 * This class creates a new Game based on the game options
 */
export class ArchitectsOfAmytisSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ArchitectsOfAmytisOptions> {
  Rules = ArchitectsOfAmytisRules

  setupMaterial(_options: ArchitectsOfAmytisOptions) {
    this.setupBuildingTiles()
    this.setupProjectCards()
    this.setupPlayers()
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

  setupProjectCards() {
    this.material(MaterialType.ProjectCard).createItems(projects.map((project) => ({
        id: project, location: { type: LocationType.ProjectCardsDeck }
    })))
    this.material(MaterialType.ProjectCard).shuffle()
    const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
    projectCardsDeck.deal({ type: LocationType.ProjectCardsDeck }, 3)
  }

  setupPlayers() {
    for (const player of playerColors) {
      this.setupPlayer(player)
    }
  }

  setupPlayer(player: PlayerColor) {
    this.material(MaterialType.PlayerBoard).createItem({
      id: player,
      location: {
        type: LocationType.PlayerBoardSpot,
        player: player
      }
    })

    this.material(MaterialType.Pawn).createItem({
      id: player,
      location: {
        type: LocationType.PlayerPawnsSupply,
        player: player
      },
      quantity: 5
    })
    // TODO: Place 2 in the Player board and Score board

    this.material(MaterialType.Architect).createItem({
      id: player,
      location: {
        type: LocationType.PlayerArchitectsSupply,
        player: player
      },
      quantity: 4
    })

  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.game.players[0])
  }
}