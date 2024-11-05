/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const EndGameScoreHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.end-game')}</>
}
