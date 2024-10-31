/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const FirstPlayerCardHelp = () => {
  const { t } = useTranslation()

  return <>
    <h2>{t('first-player-card')}</h2>
    <p>{t('end-game')}</p>
    <p>{t('scoring')}</p>
  </>
}
