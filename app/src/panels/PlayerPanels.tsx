/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { ArchitectsOfAmytisPlayerPanel } from './ArchitectsOfAmytisPlayerPanel'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <ArchitectsOfAmytisPlayerPanel key={player.id} player={player} color={playerColorCode[player.id as PlayerColor]}
                                       css={[panelCss, index === 0 ? bottom : top]} index={0}/>
      )}
    </>,
    root
  )
}

const panelCss = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateX(18em);
  width: 28em;
`

const top = css`
  top: 10em
`

const bottom = css`
  bottom: 2em
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Black]: 'black',
  [PlayerColor.White]: 'white'
}