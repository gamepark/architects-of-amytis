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
        <ArchitectsOfAmytisPlayerPanel key={player.id} player={player} color={playerColorCode[player.id as PlayerColor]} css={panelPosition(index)} index={0}/>
      )}
    </>,
    root
  )
  
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Black]: 'black',
  [PlayerColor.White]: 'white'
}