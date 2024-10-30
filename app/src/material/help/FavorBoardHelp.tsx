/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { MaterialHelpProps } from "@gamepark/react-game"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const FavorBoardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <p css={titleCss}>{ t('favor-board.upper-row.label.help') }</p>
      <ul>
        <li>{ t('favor-board.space-1.help') }</li>
        <li>{ t('favor-board.space-2.help') }</li>
        <li>{ t('favor-board.space-3.help') }</li>
        <li>{ t('favor-board.space-4.help') }</li>
        <li>{ t('favor-board.space-5.help') }</li>
        <li>{ t('favor-board.space-6.help') }</li>
        <li>{ t('favor-board.space-7.help') }</li>
      </ul>
      <p css={titleCss}>{ t('favor-board.bottom-row.label.help') }</p>
      <p>{ t('favor-board.bottom-row.help') }</p>
    </>
  )
}

const titleCss = css`
  font-weight: 700;
`
