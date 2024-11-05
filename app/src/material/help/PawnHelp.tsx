/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PawnHelp = () => {
  const { t } = useTranslation()

  return <>
    <h2>{t('pawn')}</h2>
    <p>
      <Trans
        defaults="pawn.help"
        components={{
          bold: <strong/>,
          favor: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.FavorBoard)} transient/>
        }}
      ></Trans>
    </p>
  </>
}
