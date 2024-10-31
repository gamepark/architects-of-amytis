
/** @jsxImportSource @emotion/react */

import { linkButtonCss, MaterialHelpProps, PlayMoveButton } from "@gamepark/react-game"
import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"
import { MaterialMoveBuilder } from "@gamepark/rules-api"
import { MaterialType } from "@gamepark/architects-of-amytis/material/MaterialType"
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ArchitectHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('architect')}</h2>
      <p>
        <Trans 
          defaults="architect.help"
          components={{
            main: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.MainBoard)} local/>
          }}
        ></Trans>
      </p>
    </>
  )
}
