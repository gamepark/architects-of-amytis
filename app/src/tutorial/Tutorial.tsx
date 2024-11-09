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
// import { scoreBoardDescription } from '../material/ScoreBoardDescription'

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 1
  options = { gardenSide: 1, marketSide: 1, palaceSide: 1, wallSide: 1, residenceSide: 1, theaterSide: 1 }
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
          this.material(game, MaterialType.MainBoard)
        ],
        staticItem: mainBoardDescription.staticItem.location.type
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.take-building" />
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).id(Building.GreenWall).location(l => l.z === 4)
        ],
        margin: {
          left: 1,
          top: 1,
          right: 15,
          bottom: 15
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.GreenWall).getIndex(),
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
          left: 1,
          top: 1,
          right: 15,
          bottom: 15
        }
      })
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
          <Trans
            defaults="tuto.building.anatomy-description"
            components={{
              bold: <strong />
            }}
          />
        )
      }
      // focus: (game: MaterialGame) => ({
      //   materials: [
      //     this.material(game, MaterialType.BuildingTile).location(LocationType.PlayerBoardStackSpace).player(me)
      //   ]
      // })
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
      focus: () => ({
        // materials: [
        //   this.material(game, MaterialType.BuildingCard).location(LocationType.BuildingCardSpot).player(me)
        // ],
        locations: [
          this.location(LocationType.BuildingCardSpot).location
        ]
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
      // focus: (game) => ({
      //   materials: [
      //     this.material(game, MaterialType.BuildingCard).location(LocationType.BuildingCardSpot).location(l => l.x === 5)
      //   ]
      // })
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
          && move.location.x == 0 && move.location.y === 0
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.wall.score" />
        )
      },
      focus: () => ({
        locations: [
          this.location(LocationType.ScoreBoardSpot).location
        ]
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.place-market" />
        )
      },
      focus: () => ({
        locations: [
          this.location(LocationType.PlayerBoardSpot).player(opponent).location
        ]
        // ,
        // staticItems: [
        //   scoreBoardDescription.staticItems.map((item) => ({ type: MaterialType.ScoreBoard, item}))
        // ]
      }),
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItem(move) && move.itemType === MaterialType.BuildingTile && move.itemIndex === this.material(game, MaterialType.BuildingTile).id(Building.PurpleMarket).getIndex(),
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
    }
  ]
}
