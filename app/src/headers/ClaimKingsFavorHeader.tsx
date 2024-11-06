/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ClaimKingsFavorHeader = () => {
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const me = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = activePlayer === me
  const player = usePlayerName(activePlayer)
  return (
    <Trans defaults={itsMe ? 'header.claim-kings-favor.you' : 'header.claim-kings-favor.player'} values={{ player }}>
      <strong/>
    </Trans>
  )
}
