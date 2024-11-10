import { ArchitectsOfAmytisSetup } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisSetup'
import { Building, buildings } from '@gamepark/architects-of-amytis/material/Building'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Project, projects } from '@gamepark/architects-of-amytis/material/Project'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'

export const me = PlayerColor.White
export const opponent = PlayerColor.Black
export class TutorialSetup extends ArchitectsOfAmytisSetup {
  setupBuildingTiles() {
    this.material(MaterialType.BuildingTile).createItems(buildings.concat(buildings).map((building, index) => ({
      id: building, location: { 
        type: LocationType.MainBoardStackSpace, 
        x: index }
    })))

    const topTilesIndexes = [0, 19, 10, 11, 8, 2, 12, 15, 4]
    this.material(MaterialType.BuildingTile).location(l => topTilesIndexes.includes(l.x!)).moveItems({type: LocationType.FavorBoardSpace})

    const buildingsDeck = this.material(MaterialType.BuildingTile).location(LocationType.MainBoardStackSpace).deck()
    this.material(MaterialType.BuildingTile).location(LocationType.MainBoardStackSpace).shuffle()
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 4; z++) {
          buildingsDeck.dealOne({ type: LocationType.MainBoardStackSpace, x, y, z, rotation: true })
        }
      }
    }

    const topTilesDeck = this.material(MaterialType.BuildingTile).location(LocationType.FavorBoardSpace).deck()
    const topTilesTypesOrder = [
      Building.OrangeGarden, Building.PurpleMarket, Building.GreenResidence,
      Building.GreenTheater, Building.GreenWall, Building.BlueWall,
      Building.BlueGarden, Building.OrangePalace, Building.BlueResidence
    ]
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        topTilesDeck.id(topTilesTypesOrder[y*3 + x]).moveItem({ type: LocationType.MainBoardStackSpace, x, y, z: 4, rotation: false })        
      }
    }

    buildingsDeck.deleteItems()
  }

  setupProjectCards() {
    this.material(MaterialType.ProjectCard).createItems(projects.map((project) => ({
      id: project, location: { type: LocationType.ProjectCardsDeck }
    })))
    // Move the card we will use for the tutorial to the player
    this.material(MaterialType.ProjectCard).id(Project.Project1).moveItem({type:LocationType.PlayerProjectCardsSpot, player: me })
    this.material(MaterialType.ProjectCard).location(LocationType.ProjectCardsDeck).shuffle()
    const projectCardsDeck = this.material(MaterialType.ProjectCard).deck()
    projectCardsDeck.deal({ type: LocationType.ProjectCardsDisplay }, 3)
  }

  setupPlayer(player: PlayerColor) {
    super.setupPlayer(player)
    // return back one of the new project cards
    if (player === me) {
      this.material(MaterialType.ProjectCard).location(LocationType.PlayerProjectCardsSpot).player(player).maxBy(item => item.id).moveItem({type: LocationType.ProjectCardsDeck})
    }
  }
}