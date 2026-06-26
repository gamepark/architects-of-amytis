import { css } from '@emotion/react'
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { CheckEndGameRule } from '@gamepark/architects-of-amytis/rules/CheckEndGameRule'
import { DevToolsHub, GameTable, GameTableNavigation, RulesDialog, ThemeButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  return (
    <>
      <GameTable xMin={-59} xMax={34} yMin={-27} yMax={27}
                 margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
                 css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation css={navigationCss}/>
        <PlayerPanels/>
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)" />}
      </GameTable>
      <EndGameInfo/>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`

const navigationCss = css`
  top: 50%;
`

const EndGameInfo = () => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()
  const gameOverTriggered = rules && !rules.isOver() && new CheckEndGameRule(rules.game).has2EmptyStacks()
  const [dismissed, setDismissed] = useState(false)
  const me = usePlayerId()
  const player = usePlayerName(rules?.players[1])
  const open = !!gameOverTriggered && !dismissed
  return <RulesDialog open={open} css={css`font-size: 3em;
    padding: 1em;`}>
    <p>{t('game-over.trigger')}</p>
    <p>{me === rules?.players[1] ? t('game-over.you') : t('game-over.player', { player })}</p>
    <ThemeButton onClick={() => setDismissed(true)}>{t('OK', { ns: 'common' })}</ThemeButton>
  </RulesDialog>
}
