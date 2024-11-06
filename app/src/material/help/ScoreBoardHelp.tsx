/** @jsxImportSource @emotion/react */

import { ArchitectsOfAmytisRules } from "@gamepark/architects-of-amytis/ArchitectsOfAmytisRules"
import { Memory } from "@gamepark/architects-of-amytis/rules/Memory"
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from "@gamepark/react-game"
import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"

export const ScoreBoardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const player = usePlayerId()
  const otherPlayer = rules.players[0] === player ? rules.players[1] : rules.players[0]
  
  return (
    <>
      <h2>{t('score-board')}</h2>
      <p>
        <Trans 
          defaults="score.you"
          values={{score: rules.remind(Memory.Score, player)}}
        ></Trans>
      </p>
      <p>
        <Trans 
          defaults="score.player"
          values={{player: usePlayerName(otherPlayer), score: rules.remind(Memory.Score, otherPlayer)}}
        ></Trans>
      </p>
    </>
  )
}
