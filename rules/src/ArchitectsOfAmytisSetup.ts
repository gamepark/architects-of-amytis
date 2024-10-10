import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArchitectsOfAmytisOptions } from './ArchitectsOfAmytisOptions'
import { ArchitectsOfAmytisRules } from './ArchitectsOfAmytisRules'
import { buildings, buildingTypes } from './material/Building'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor, playerColors } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { projects } from './material/Project'
import { Memory } from './rules/Memory'
import { BuildingCardSide } from './material/BuildingCard'

/**
 * This class creates a new Game based on the game options
 */
export class ArchitectsOfAmytisSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ArchitectsOfAmytisOptions> {
  Rules = ArchitectsOfAmytisRules

  setupMaterial(_options: ArchitectsOfAmytisOptions) {
    this.setupBuildingTiles()
    this.setupProjectCards()
    this.setupPlayers()
    this.setupBuildingCards()

    this.memorize(Memory.LastTurn, false)
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
    projectCardsDeck.deal({ type: LocationType.ProjectCardsDisplay }, 3)
  }

  setupPlayers() {
    for (const player of playerColors) {
      this.setupPlayer(player)
    }
  }

  setupPlayer(player: PlayerColor) {
    this.material(MaterialType.Pawn).createItem({
      id: player,
      location: {
        type: LocationType.PlayerPawnsSupply,
        player: player
      },
      quantity: 7
    })
    this.material(MaterialType.Pawn).location(LocationType.PlayerPawnsSupply).player(player).moveItem({
      type: LocationType.ScoreRangeAreaSpace,
      player: player,
      x: 0
    }, 1)
    this.material(MaterialType.Pawn).location(LocationType.PlayerPawnsSupply).player(player).moveItem({
      type: LocationType.ScoreBoardSpace,
      x: 0
    }, 1)

    this.material(MaterialType.Architect).createItem({
      id: player,
      location: {
        type: LocationType.PlayerArchitectsSupply,
        player: player
      },
      quantity: 4
    })

    const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
    projectCardsDeck.deal({ 
      type: LocationType.PlayerProjectCardsSpot,
      player: player
    }, 2)

    if (player === this.game.players[0]) {
      this.material(MaterialType.FirstPlayerCard).createItem({
        location: {
          type: LocationType.FirstPlayerCardSpot,
          player: player
        }
      })
    }

    this.memorize(Memory.Score, { [this.game.players[0]]: 0, [this.game.players[1]]: 0})
  }

  setupBuildingCards() {
    const cardsSides: { [key: number]: number } = {};

    buildingTypes.forEach(buildingType => {
      cardsSides[buildingType] = Math.random() < 0.5 ? BuildingCardSide.SideA : BuildingCardSide.SideB
    })
    console.log(cardsSides)
    this.memorize(Memory.BuildingCardsSides, cardsSides)
  }

  start() {
    this.startPlayerTurn(RuleId.RetrieveArchitects, this.game.players[0])
  }
}