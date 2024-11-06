/** @jsxImportSource @emotion/react */

import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const ScoreBoardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const me = usePlayerId()

  return (
    <>
      <h2>{t('score-board')}</h2>
      {rules.players.map(player =>
        <p key={player}>
          {player === me ?
            <Trans defaults="score.you" values={{ score: rules.remind(Memory.Score, player) }}/>
            : <PlayerScoreText playerColor={player} score={rules.remind(Memory.Score, player)}/>}
        </p>
      )}
    </>
  )
}

const PlayerScoreText = ({ playerColor, score }: { playerColor: PlayerColor, score: number }) => {
  const player = usePlayerName(playerColor)
  return <Trans defaults="score.player" values={{ player, score }}/>
}
