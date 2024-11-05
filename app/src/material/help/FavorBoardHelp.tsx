/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { linkButtonCss, MaterialHelpProps, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const FavorBoardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('favor-board')}</h2>
      <p>
        <Trans
          defaults="favor-board.help"
          components={{
            bold: <strong/>,
            main: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.MainBoard)} transient/>
          }}
        ></Trans>
      </p>
      <p css={titleCss}>{t('favor-board.upper-row.label.help')}</p>
      <ul>
        <li>{t('favor-board.space-1.help')}</li>
        <li>{t('favor-board.space-2.help')}</li>
        <li>{t('favor-board.space-3.help')}</li>
        <li>{t('favor-board.space-4.help')}</li>
        <li>{t('favor-board.space-5.help')}</li>
        <li>{t('favor-board.space-6.help')}</li>
        <li>{t('favor-board.space-7.help')}</li>
      </ul>
      <p css={titleCss}>{t('favor-board.bottom-row.label.help')}</p>
      <p>{t('favor-board.bottom-row.help')}</p>
    </>
  )
}

const titleCss = css`
  font-weight: 700;
`
