/** @jsxImportSource @emotion/react */

import { ArchitectsOfAmytisRules } from "@gamepark/architects-of-amytis/ArchitectsOfAmytisRules"
import { BuildingCardSide } from "@gamepark/architects-of-amytis/material/BuildingCard"
import { SelectProjectCardRule } from "@gamepark/architects-of-amytis/rules/SelectProjectCardRule"
import { usePlayerId, useRules } from "@gamepark/react-game"
import { Trans } from "react-i18next"

export const SelectProjectCardHeader = () => {
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const selectProjectCardRule = new SelectProjectCardRule(rules.game)
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  // const name = usePlayerName(activePlayer)
  const itsMe = activePlayer === player
  const palaceCardSide = selectProjectCardRule.palaceCardSide
  const headerYouLabel = palaceCardSide === BuildingCardSide.SideA ? "get-project-card-and-points.you" : "get-project-card-or-points.you"
  const headerPlayerLabel = palaceCardSide === BuildingCardSide.SideA ? "get-project-card-and-points.player" : "get-project-card-or-points.player"

  // const palaceAction = BuildingEffect.createBuildingAction(rules.game, BuildingType.Palace)
  // const palaceSideB = palaceAction && 'addSideBPoints' in palaceAction ? palaceAction.addSideBPoints() : []
  // const getPointsEffect = useLegalMove(() => palaceSideB.length === 0) ?? []


  if (palaceCardSide == BuildingCardSide.SideA) {
    return (
      <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: activePlayer }}></Trans>
    )
  } else {    
    return (
      <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: activePlayer }}>
        {/* <PlayMoveButton move={getPointsEffect}/> */}
      </Trans>
    )
  }
}

// const flexRowCss = css`
// `

// const mini = css`
//   height: 1.05em;
//   margin-bottom: -0.17em;
// `

