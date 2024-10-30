/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { PlayerColor } from '@gamepark/architects-of-amytis/PlayerColor'
import { Memory } from '@gamepark/architects-of-amytis/rules/Memory'
import { Player } from '@gamepark/react-client'
import { CounterProps, StyledPlayerPanel, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import BlackBackground from '../images/cards/BlackBackground.jpg'
import WhiteBackground from '../images/cards/WhiteBackground.jpg'
import { pawnDescription } from '../material/PawnDescription'

type ArchitectsOfAmytisPlayerPanelProps = {
  player: Player,
  index: number
} & HTMLAttributes<HTMLDivElement>

export const ArchitectsOfAmytisPlayerPanel: FC<ArchitectsOfAmytisPlayerPanelProps> = (props) => {
  const { player, index, ...rest } = props
  const rules = useRules<ArchitectsOfAmytisRules>()!

  const counters: CounterProps[] = [{
    image: pawnDescription.images[player.id as PlayerColor],
    value: rules.remind(Memory.Score)[player.id]
  }]

  return (
    <StyledPlayerPanel
      activeRing
      player={player}
      counters={counters}
      backgroundImage={player.id === PlayerColor.Black ? BlackBackground : WhiteBackground}
      countersPerLine={2}
      css={canClick}
      {...rest}
    />
  )
}

const canClick = css`
  cursor: pointer;
`
