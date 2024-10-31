/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const BuildingCardHelp = () => {
  const { t } = useTranslation()

  return <>
    <h2>{t('building-card')}</h2>
    <p>{t('building-card.help')}</p>
  </>
}
