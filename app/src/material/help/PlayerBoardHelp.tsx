/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PlayerBoardHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const player = usePlayerId()
  const locationPlayerName = usePlayerName(item.location?.player)
  const title = item.location?.player === player ? t('player-board.you') : t('player-board.player', {player: locationPlayerName})

  return <>
    <h2>{t(title)}</h2>
    <p>{t('player-board.help')}</p>
  </>
}
