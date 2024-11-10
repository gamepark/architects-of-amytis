/** @jsxImportSource @emotion/react */
import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import FacialHairColorName from '@gamepark/avataaars/dist/avatar/top/facialHair/FacialHairColorName'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'
import { isMoveItem, isMoveItemType, MaterialGame } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { mainBoardDescription } from '../material/MainBoardDescription'
import { Building } from '@gamepark/architects-of-amytis/material/Building'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { scoreBoardDescription } from '../material/ScoreBoardDescription'
import { favorBoardDescription } from '../material/FavorBoardDescription'
import { Project } from '@gamepark/architects-of-amytis/material/Project'

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
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile)
        ],
        staticItems: [{ type: MaterialType.MainBoard, item: mainBoardDescription.staticItem }]
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
          this.material(game, MaterialType.BuildingTile).id(Building.GreenWall).location(l => l.z === 4),
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
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.GreenWall).getIndex()
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
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Architect).location(LocationType.MainBoardStackSpace)
        ],
        margin: {
          left: 25,
          top: 1,
          right: 1,
          bottom: 3
        }
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
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.BuildingCard).player(me)
        ]
        // staticItems: buildingCardDescription.getStaticItems()
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.building-cards.wall" />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.BuildingCard).location(LocationType.BuildingCardSpot).location(l => l.x === 5)
        ]
        // ,
        // staticItems: buildingCardDescription.getStaticItems(useMaterialContext())
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
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.PlayerBoard).location(LocationType.PlayerBoardStackSpace).player(me),
          this.material(game, MaterialType.Architect).location(LocationType.PlayerHand).player(me)
        ]
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place-wall" />
        )
      },
      focus: () => ({
        locations: [
          this.location(LocationType.PlayerBoardStackSpace).player(me).location,
          this.location(LocationType.PlayerHand).player(me).location
        ]
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
          this.material(game, MaterialType.ScoreBoard),
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
      // focus: () => ({
      //   locations: [
      //     this.location(LocationType.PlayerBoardSpot).player(opponent).location
      //   ]
      // }),
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.PurpleMarket).getIndex()
      }
    },
    { 
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.place-market" />
        )
      },
      move: {
        player: opponent,
        interrupt: (move) => isMoveItemType(MaterialType.BuildingTile)(move)
      }
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
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.BlueResidence).getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place-residence" />
        )
      },
      focus: () => ({
        locations: [
          this.location(LocationType.PlayerBoardStackSpace).player(me).location,
          this.location(LocationType.PlayerHand).player(me).location
        ]
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
      // focus: () => ({
      //   locations: [
      //     this.location(LocationType.PlayerBoardSpot).player(opponent).location
      //   ]
      // }),
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.GreenTheater).getIndex()
      }
    },
    { 
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.place-theater" />
        )
      },
      move: {
        player: opponent,
        interrupt: (move) => isMoveItemType(MaterialType.BuildingTile)(move)
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
          bottom: 1
        },
      }),      
      move: {
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.OrangeGarden).getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place-garden" />
        )
      },
      focus: () => ({
        locations: [
          this.location(LocationType.PlayerBoardStackSpace).player(me).location,
          this.location(LocationType.PlayerHand).player(me).location
        ]
      }),
      move: {
        filter: (move) =>
          isMoveItem(move)
          && move.location.x === 2 && move.location.y === 2 && move.location.player === me
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.project-card.validation" />
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(me),
          this.material(game, MaterialType.ProjectCard).id(Project.Project1)
        ],
        staticItems: [{ type: MaterialType.PlayerBoard, item: mainBoardDescription.staticItem }]
      })
      // ,
      // move: {
      //   interrupt: (move) => isMoveItemType(MaterialType.ProjectCard)(move)
      // }
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
          bottom: 5
        }
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
