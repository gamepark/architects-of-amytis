/** @jsxImportSource @emotion/react */
import { Building, buildingTypes } from '@gamepark/architects-of-amytis/material/Building'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { Project } from '@gamepark/architects-of-amytis/material/Project'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import FacialHairColorName from '@gamepark/avataaars/dist/avatar/top/facialHair/FacialHairColorName'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItem, isMoveItemType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { buildingCardDescription } from '../material/BuildingCardDescription'
import { favorBoardDescription } from '../material/FavorBoardDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { scoreBoardDescription } from '../material/ScoreBoardDescription'
import { me, opponent, TutorialSetup } from './TutorialSetup'

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 1
  options = {
    players: [{ id: PlayerColor.White }, { id: PlayerColor.Black }],
    gardenSide: 1, marketSide: 1, palaceSide: 1, wallSide: 1, residenceSide: 1, theaterSide: 1
  }
  setup = new TutorialSetup()

  players = [{ id: me }, {
    id: opponent,
    name: 'Resac',
    avatar: {
      topType: TopType.ShortHairShaggyMullet,
      hairColor: HairColorName.SilverGray,
      facialHairType: FacialHairType.MoustacheFancy,
      facialHairColor: FacialHairColorName.BrownDark,
      clotheType: ClotheType.CollarSweater,
      clotheColor: ClotheColorName.PastelRed,
      eyeType: EyeType.Squint,
      eyebrowType: EyebrowType.FlatNatural,
      mouthType: MouthType.Smile,
      skinColor: SkinColor.Light
    }
  }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.welcome"
            components={{
              bold: <strong />
            }}
          />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.intro" />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.intro.players-colors" />
        ),
        position: {
          y: -10
        }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Architect).id(me),
          this.material(game, MaterialType.Pawn).id(me)
        ],
        margin: {
          left: 1,
          top: 1,
          right: 15,
          bottom: 15
        },
        scale: 1.5
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.intro.main-board" />
        ),
        position: { x: -30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile)
        ],
        staticItems: [{ type: MaterialType.MainBoard, item: mainBoardDescription.staticItem }],
        margin: { right: 3, bottom: 3, top: 3, left: 30 }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.take-building" />
        ),
        position: { x: -30 },
        size: { width: 50 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).id(Building.GreenWall).location(l => l.z === 4),
          this.material(game, MaterialType.FirstPlayerCard)
        ],
        margin: {
          left: 1,
          top: 15,
          right: 1,
          bottom: 5
        },
      }),
      move: {
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile
          && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.GreenWall).location(l => l.x === 1 && l.y === 1).getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.place-architect"
            components={{
              bold: <strong />
            }}
          />
        ),
        position: { x: -30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Architect).location(LocationType.MainBoardStackSpace)
        ],
        margin: { left: 25 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.building.anatomy-description"
            components={{
              bold: <strong />
            }}
          />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.building.color-description" />
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.ProjectCard).location(LocationType.PlayerProjectCardsSpot).player(me)
        ],
        margin: {
          left: 25
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.building-cards"
            components={{
              bold: <strong />
            }}
          />
        ),
        position: { x: 15, y: 15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.BuildingCard).player(me)
        ],
        staticItems: buildingTypes.map((buildingType) => ({
          type: MaterialType.BuildingCard, item: buildingCardDescription.getBuildingCards({
            "1": 1,
            "2": 1,
            "3": 1,
            "4": 1,
            "5": 1,
            "6": 1
          }).filter(elem => elem.location.player === me)[buildingType - 1]
        })),
        margin: {
          top: 1,
          bottom: 20,
          left: 1,
          right: 50
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.building-cards.wall" />
        ),
        position: { x: 15, y: 15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.BuildingCard).player(me)
        ],
        staticItems: buildingTypes.map(() => ({
          type: MaterialType.BuildingCard, item: buildingCardDescription.getBuildingCards({
            "1": 1,
            "2": 1,
            "3": 1,
            "4": 1,
            "5": 1,
            "6": 1
          }).filter(elem => elem.location.player === me)[2]
        })),
        margin: {
          top: 1,
          bottom: 20,
          left: 1,
          right: 30
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.building-cards.effects"
            components={{
              bold: <strong />
            }}
          />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.building.placement-description" />
        ),
        position: { y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerHand).player(me)
        ],
        locations: [{ type: LocationType.PlayerBoardStackSpace, x: 0, y: 0, player: me }],
        margin: { top: 20, bottom: 15 }
      }),
      move: {
        filter: (move) =>
          isMoveItem(move)
          && move.location.x === 0 && move.location.y === 0 && move.location.player === me
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.wall.score" />
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Pawn).location(LocationType.ScoreBoardSpace).id(me)
        ],
        staticItems: [{ type: MaterialType.ScoreBoard, item: scoreBoardDescription.staticItem }],
        margin: {
          top: 1,
          bottom: 5,
          left: 1,
          right: 60
        }
      })
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile
          && this.material(game, MaterialType.BuildingTile).id(Building.PurpleMarket).getIndexes().includes(move.itemIndex)
      }
    },
    {
      move: {
        player: opponent
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.place-market" />
        ),
        position: { x: -20, y: 10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(opponent),
          this.material(game, MaterialType.Pawn).location(LocationType.ScoreBoardSpace).id(opponent)
        ],
        staticItems: [{ type: MaterialType.ScoreBoard, item: scoreBoardDescription.staticItem }],
        margin: {left: 10, top: 3, bottom: 5, right: 1}
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.project-card.intro" />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ProjectCard).location(LocationType.PlayerProjectCardsSpot).player(me)
        ],
        margin: {
          left: 25
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.project-card.description"
            components={{
              bold: <strong />
            }}
          />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ProjectCard).location(LocationType.PlayerProjectCardsSpot).player(me)
        ],
        margin: {
          left: 25
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.take-building" />
        ),
        position: { x: -20 },
        size: { width: 50 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).id(Building.BlueResidence).location(l => l.z === 4),
          this.material(game, MaterialType.FirstPlayerCard)
        ],
        margin: {
          left: 1,
          top: 15,
          right: 1,
          bottom: 1
        },
      }),
      move: {
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile
          && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.BlueResidence).location(l => l.x === 2 && l.y === 2).getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place-residence" />
        ),
        position: { y: -22 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerHand)],
        locations: [{type: LocationType.PlayerBoardStackSpace, x: 1, y: 1, player: me}],
        margin: { top: 20, bottom: 6 }
      }),
      move: {
        filter: (move) =>
          isMoveItem(move)
          && move.location.x === 1 && move.location.y === 1 && move.location.player === me
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.residence.score"
            components={{
              bold: <strong />
            }}
          />
        )
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile
          && this.material(game, MaterialType.BuildingTile).id(Building.GreenTheater).getIndexes().includes(move.itemIndex)
      }
    },
    {
      move: {
        player: opponent
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.place-theater" />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.take-building" />
        ),
        position: { x: -20 },
        size: { width: 40 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).id(Building.OrangeGarden).location(l => l.z === 4),
          this.material(game, MaterialType.FirstPlayerCard)
        ],
        margin: {
          left: 1,
          top: 15,
          right: 1,
          bottom: 5
        },
      }),
      move: {
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile
          && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.OrangeGarden).location(l => l.x === 0 && l.y === 0).getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place-garden" />
        ),
        position: { y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerHand)],
        locations: [{type: LocationType.PlayerBoardStackSpace, x: 2, y: 2, player: me}],
        margin: { top: 25, bottom: 3 }
      }),
      move: {
        filter: (move) =>
          isMoveItem(move)
          && move.location.x === 2 && move.location.y === 2 && move.location.player === me,
        interrupt: move => isMoveItemType(MaterialType.ProjectCard)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.project-card.validation" />
        ),
        position: { y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(me),
          this.material(game, MaterialType.ProjectCard).id(Project.Project1)
        ],
        margin: { top: 15, bottom: 5 }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.favor-board"
            components={{
              bold: <strong />
            }}
          />
        ),
        position: { x: 50, y: -21 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FavorBoard),
          this.material(game, MaterialType.Architect).id(me).location(LocationType.MainBoardStackSpace)
        ],
        staticItems: [{ type: MaterialType.FavorBoard, item: favorBoardDescription.staticItem }],
        scale: 0.9
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.favor-board.action" />
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FavorBoard)
        ],
        staticItems: [{ type: MaterialType.FavorBoard, item: favorBoardDescription.staticItem }],
        margin: {
          left: 50,
          top: 1,
          right: 1,
          bottom: 3
        }
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.Pawn)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.end-game" />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.over" />
        )
      }
    }
  ]
}
