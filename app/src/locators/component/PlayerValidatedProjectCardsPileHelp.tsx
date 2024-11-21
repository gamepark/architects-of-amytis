/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { LocationType } from '@gamepark/architects-of-amytis/material/LocationType'
import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlayerValidatedProjectCardsPileHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArchitectsOfAmytisRules>()!
  const play = usePlay()
  const me = usePlayerId()
  const player = usePlayerName(location.player)
  const cards = rules.material(MaterialType.ProjectCard).location(LocationType.PlayerValidatedProjectCardsPile).player(location.player)
  const number = cards.length
  return <>
    <h2>{t('projects.validated')}</h2>
    <p>{t(`projects.validated.${me === location.player ? 'you' : 'player'}`, { player, number })}</p>
    {(me === location.player || rules.isOver()) &&
      <ol css={grid}>
        {cards?.entries.map(([index, card]) =>
          <li key={index}>
            <MaterialComponent type={MaterialType.ProjectCard} itemId={card.id} css={pointerCursorCss}
                               onClick={() => play(displayMaterialHelp(MaterialType.ProjectCard, card, index), { transient: true })}/>
          </li>
        )}
      </ol>
    }
  </>
}

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 0.8em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.5em;
`
