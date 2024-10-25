/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from "@gamepark/architects-of-amytis/ArchitectsOfAmytisRules"
import { BuildingCardSide, BuildingType } from "@gamepark/architects-of-amytis/material/Building"
import { BuildingEffect } from "@gamepark/architects-of-amytis/rules/BuildingEffect"
import { SelectProjectCardRule } from "@gamepark/architects-of-amytis/rules/SelectProjectCardRule"
import { PlayMoveButton, usePlayerId, usePlayerName, useRules } from "@gamepark/react-game"
import { Trans } from "react-i18next"

export const SelectProjectCardHeader = () => {
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const playerName = usePlayerName(activePlayer)
  const selectProjectCardRule = new SelectProjectCardRule(rules.game)
  const itsMe = activePlayer === me
  const palaceCardSide = selectProjectCardRule.palaceCardSide
  const headerYouLabel = palaceCardSide === BuildingCardSide.SideA ? "get-project-card-and-points.you" : "get-project-card-or-points.you"
  const headerPlayerLabel = palaceCardSide === BuildingCardSide.SideA ? "get-project-card-and-points.player" : "get-project-card-or-points.player"

  const palaceAction = BuildingEffect.createBuildingAction(rules.game, BuildingType.Palace)
  // const palaceSideB = palaceAction && 'addSideBPoints' in palaceAction ? palaceAction.addSideBPoints() : []
  // const points = useLegalMove(() => palaceSideB.length === 0) ?? []

  if (palaceCardSide == BuildingCardSide.SideA) {
    return <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: playerName }}/>
    
  } else {    
    return <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: playerName }} components={{
      points: <PlayMoveButton move={palaceAction}/>
    }}/>
  }
}

//   if (palaceCardSide == BuildingCardSide.SideA) {
//     return (
//       <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: activePlayer }}></Trans>
//     )
//   } else {    
//     return (
//       <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: activePlayer }}>
//         {/* <PlayMoveButton move={getPointsEffect}/> */}
//       </Trans>
//     )
//   }
// }
// return <Trans defaults="header.roll.you" components={{
//   roll: <PlayMoveButton move={roll}/>,
//   add: <PlayMoveButton move={addDice}/>
// }}/>

// const flexRowCss = css`
// `

// const mini = css`
//   height: 1.05em;
//   margin-bottom: -0.17em;
// `

