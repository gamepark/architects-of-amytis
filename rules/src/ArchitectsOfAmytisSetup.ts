import { MaterialGameSetup } from '@gamepark/rules-api'
import { keyBy, mapValues } from 'lodash'
import { ArchitectsOfAmytisOptions } from './ArchitectsOfAmytisOptions'
import { ArchitectsOfAmytisRules } from './ArchitectsOfAmytisRules'
import { BuildingCardSide, buildings, BuildingType, buildingTypes } from './material/Building'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { projects } from './material/Project'
import { PlayerColor, playerColors } from './PlayerColor'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class ArchitectsOfAmytisSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ArchitectsOfAmytisOptions> {
  Rules = ArchitectsOfAmytisRules

  setupMaterial(options: ArchitectsOfAmytisOptions) {
    this.setupBuildingTiles()
    this.setupProjectCards()
    this.setupPlayers()
    this.setupBuildingCards(options)

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
    }, player === this.players[0] ? 2 : 3)

    if (player === this.game.players[0]) {
      this.material(MaterialType.FirstPlayerCard).createItem({
        location: {
          type: LocationType.FirstPlayerCardSpot,
          player: player
        }
      })
    }

    this.memorize(Memory.Score, { [this.game.players[0]]: 0, [this.game.players[1]]: 0 })
  }

  getBuildingSide(options: ArchitectsOfAmytisOptions, buildingType: BuildingType) {
    switch (buildingType) {
      case BuildingType.Garden:
        return options.gardenSide
      case BuildingType.Market:
        return options.marketSide
      case BuildingType.Wall:
        return options.wallSide
      case BuildingType.Palace:
        return options.palaceSide
      case BuildingType.Residence:
        return options.residenceSide
      case BuildingType.Theater:
        return options.theaterSide
    }
  }

  setupBuildingCards(options: ArchitectsOfAmytisOptions) {
    this.memorize(Memory.BuildingCardsSides,
      mapValues(keyBy(buildingTypes), buildingType =>
        this.getBuildingSide(options, buildingType) ?? (Math.random() < 0.5 ? BuildingCardSide.SideA : BuildingCardSide.SideB)
      )
    )
  }

  start() {
    this.startPlayerTurn(RuleId.RetrieveArchitects, this.game.players[0])
  }
}