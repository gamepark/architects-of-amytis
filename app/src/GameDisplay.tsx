/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { CheckEndGameRule } from '@gamepark/architects-of-amytis/rules/CheckEndGameRule'
import { GameTable, GameTableNavigation, RulesDialog, ThemeButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable xMin={-59} xMax={34} yMin={-27} yMax={27}
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
               css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
      <GameTableNavigation css={navigationCss}/>
      <PlayerPanels/>
    </GameTable>
    <EndGameInfo/>
  </>
}

const navigationCss = css`
  top: 50%;
`

const EndGameInfo = () => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()
  const gameOverTriggered = rules && !rules.isOver() && new CheckEndGameRule(rules.game).has2EmptyStacks()
  const [open, setOpen] = useState(false)
  const me = usePlayerId()
  const player = usePlayerName(rules?.players[1])
  useEffect(() => {
    if (gameOverTriggered) {
      setOpen(true)
    }
  }, [gameOverTriggered])
  return <RulesDialog open={open} css={css`font-size: 3em;
    padding: 1em;`}>
    <p>{t('game-over.trigger')}</p>
    <p>{me === rules?.players[1] ? t('game-over.you') : t('game-over.player', { player })}</p>
    <ThemeButton onClick={() => setOpen(false)}>{t('OK')}</ThemeButton>
  </RulesDialog>
}
