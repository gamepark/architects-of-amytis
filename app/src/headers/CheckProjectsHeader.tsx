/** @jsxImportSource @emotion/react */

import { useTranslation } from "react-i18next"

export const CheckProjectsHeader = () => {
  const { t } = useTranslation()
  return <span>{t('header.check-projects')}</span>
}
