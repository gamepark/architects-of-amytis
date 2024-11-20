/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { CustomMoveType } from '@gamepark/architects-of-amytis/rules/CustomMoveType'
import { PlayMoveButton, UndoMovesButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ValidateBuildingHeader = () => {
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const me = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = activePlayer === me
  const player = usePlayerName(activePlayer)
  const validate = useLegalMove(isCustomMoveType(CustomMoveType.Validate))
  if (itsMe) {
    if (!validate) return null
    return (
      <Trans defaults="header.validate-building.you" components={{
        validate: <PlayMoveButton move={validate} auto={15}/>,
        undo: <UndoMovesButton/>
      }}/>
    )
  } else {
    return <Trans defaults="header.validate-building.player" values={{ player }}/>
  }
}
