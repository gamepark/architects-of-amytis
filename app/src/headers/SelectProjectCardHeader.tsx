/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from "@gamepark/architects-of-amytis/ArchitectsOfAmytisRules"
import { BuildingCardSide } from "@gamepark/architects-of-amytis/material/Building"
import { CustomMoveType } from "@gamepark/architects-of-amytis/rules/CustomMoveType"
import { SelectProjectCardRule } from "@gamepark/architects-of-amytis/rules/SelectProjectCardRule"
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from "@gamepark/react-game"
import { isCustomMoveType } from "@gamepark/rules-api"
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

  const palaceAction = useLegalMove(isCustomMoveType(CustomMoveType.Score))
  if (palaceCardSide == BuildingCardSide.SideA) {
    return <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: playerName }}/>
    
  } else {    
    return <Trans defaults={itsMe ? headerYouLabel : headerPlayerLabel } values={{ player: playerName }} components={{
      points: <PlayMoveButton move={palaceAction}/>
    }}/>
  }
}
