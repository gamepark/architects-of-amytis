/** @jsxImportSource @emotion/react */

import { useTranslation } from "react-i18next"

export const RetrieveArchitectsHeader = () => {
  const { t } = useTranslation()
  return <span>{t('header.retrieve-architects')}</span>
}
