import { MaterialType } from '@gamepark/architects-of-amytis/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { favorBoardDescription } from './FavorBoardDescription'
import { mainBoardDescription } from './MainBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.MainBoard]: mainBoardDescription,
  [MaterialType.FavorBoard]: favorBoardDescription
}
