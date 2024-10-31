/** @jsxImportSource @emotion/react */
// import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const MainBoardHelp = () => {
  const { t } = useTranslation()

  return <>
    <h2>{t('main-board')}</h2>
    <p>
      <Trans 
        defaults="main-board.help"
        components={{
          bold: <strong/>,
          favor: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.FavorBoard)} local/>
        }}
      ></Trans>
    </p>
  </>
}
