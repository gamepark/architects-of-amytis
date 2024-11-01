/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const RetrieveArchitectsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const me = usePlayerId()
  const player = usePlayerName(me)
  if (rules.getActivePlayer() === me) {
    return <span>{t('header.retrieve-architects.you')}</span>
  } else {
    return <span>{t('header.retrieve-architects.player', { player })}</span>
  }
}
