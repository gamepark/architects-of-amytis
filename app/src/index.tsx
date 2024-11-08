/** @jsxImportSource @emotion/react */
import { ArchitectsOfAmytisOptionsSpec } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisOptions'
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { ArchitectsOfAmytisSetup } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="architects-of-amytis"
      Rules={ArchitectsOfAmytisRules}
      optionsSpec={ArchitectsOfAmytisOptionsSpec}
      GameSetup={ArchitectsOfAmytisSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      tutorial={new Tutorial()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
