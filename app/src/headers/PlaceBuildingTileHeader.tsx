/** @jsxImportSource @emotion/react */

import { ArchitectsOfAmytisRules } from "@gamepark/architects-of-amytis/ArchitectsOfAmytisRules"
import { usePlayerId, usePlayerName, useRules } from "@gamepark/react-game"
import { Trans } from "react-i18next"

export const PlaceBuildingTileHeader = () => {
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const player = usePlayerId()
  const itsMe = rules.getActivePlayer() === player
  const playerName = usePlayerName(player)
  return (
    <Trans defaults={itsMe ? "header.place-building.you" : "header.place-building.player"} values={{ player: playerName }}>
      <strong/>
    </Trans>
  )
}