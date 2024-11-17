import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { BuildingCardSide, BuildingType, getBuildingColor, getBuildingType } from '../material/Building'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BoardHelper } from './helpers/BoardHelper'
import { Memory } from './Memory'


abstract class BuildingRule extends MaterialRulesPart {
  get tile() {
    return this.material(MaterialType.BuildingTile).getItem(this.remind<number>(Memory.PlacedTile))
  }

  get playerTiles() {
    return this.material(MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(this.tile.location.player)
  }

  get playerTopTiles() {
    return new BoardHelper(this.game).getVisibleTilesInStack(this.playerTiles).getItems()
  }

  get topBuildingTypes() {
    return this.playerTopTiles.map(tile => getBuildingType(tile.id))
  }

  get buildingColor() {
    return getBuildingColor(this.tile.id)
  }

  abstract get score(): number
}

class GardenARule extends BuildingRule {
  get score() {
    let points = 0

    const { x, y } = this.tile.location
    const playerTiles = this.playerTiles
    const destinationStackSize = playerTiles.location(location => location.x === x && location.y === y).length

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (playerTiles.location(location => location.x === x && location.y === y).length === destinationStackSize) {
          points++
        }
      }
    }

    return points
  }
}

class GardenBRule extends BuildingRule {
  get score() {
    const { x, y } = this.tile.location
    const playerTiles = this.playerTiles
    const destinationStackSize = playerTiles.location(location => location.x === x && location.y === y).length
    return destinationStackSize * 2
  }
}

class MarketARule extends BuildingRule {
  get score() {
    const buildingColor = this.buildingColor
    return sumBy(this.playerTopTiles, tile => getBuildingColor(tile.id) === buildingColor ? 2 : 0)
  }
}

class MarketBRule extends BuildingRule {
  get score() {
    const buildingColor = this.buildingColor
    return sumBy(this.playerTopTiles, tile => getBuildingColor(tile.id) !== buildingColor ? 1 : 0)
  }
}

class WallARule extends BuildingRule {
  get score() {
    return sumBy(this.playerTopTiles, tile =>
      getBuildingType(tile.id) === BuildingType.Wall && (tile.location.x !== 1 || tile.location.y !== 1) ? 2 : 0
    )
  }
}

class WallBRule extends BuildingRule {
  get score() {
    const cornerTiles = this.playerTopTiles.filter(item => item.location.x !== 1 && item.location.y !== 1)
    const wallsInCorners = sumBy(cornerTiles, tile => getBuildingType(tile.id) === BuildingType.Wall ? 1 : 0)
    switch (wallsInCorners) {
      case 1:
        return 1
      case 2:
        return 4
      case 3:
        return 8
      case 4:
      default:
        return 10
    }
  }
}

export class PalaceARule extends BuildingRule {
  get score() {
    return sumBy(this.topBuildingTypes, type => type === BuildingType.Palace ? 1 : 0)
  }
}

export class PalaceBRule extends BuildingRule {
  get score() {
    return this.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).length
  }
}

class ResidenceARule extends BuildingRule {
  get score() {
    return new Set(this.topBuildingTypes).size
  }
}

class ResidenceBRule extends BuildingRule {
  get score() {
    return sumBy(this.topBuildingTypes, type =>
      type === BuildingType.Residence || type === BuildingType.Market ? 2 : 0
    )
  }
}

class TheaterARule extends BuildingRule {
  get score() {
    return this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).length
  }
}

class TheaterBRule extends BuildingRule {
  get score() {
    return this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).id(this.tile.location.player).length * 2
  }
}

interface BuildingRuleCreator {
  new(game: MaterialGame): BuildingRule
}

export const BuildingRules: Record<BuildingType, Record<BuildingCardSide, BuildingRuleCreator>> = {
  [BuildingType.Garden]: {
    [BuildingCardSide.SideA]: GardenARule,
    [BuildingCardSide.SideB]: GardenBRule
  },
  [BuildingType.Market]: {
    [BuildingCardSide.SideA]: MarketARule,
    [BuildingCardSide.SideB]: MarketBRule
  },
  [BuildingType.Wall]: {
    [BuildingCardSide.SideA]: WallARule,
    [BuildingCardSide.SideB]: WallBRule
  },
  [BuildingType.Palace]: {
    [BuildingCardSide.SideA]: PalaceARule,
    [BuildingCardSide.SideB]: PalaceBRule
  },
  [BuildingType.Residence]: {
    [BuildingCardSide.SideA]: ResidenceARule,
    [BuildingCardSide.SideB]: ResidenceBRule
  },
  [BuildingType.Theater]: {
    [BuildingCardSide.SideA]: TheaterARule,
    [BuildingCardSide.SideB]: TheaterBRule
  }
}
