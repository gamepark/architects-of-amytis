import { ArchitectsOfAmytisOptionsSpec } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisOptions'
import { ArchitectsOfAmytisRules } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisRules'
import { ArchitectsOfAmytisSetup } from '@gamepark/architects-of-amytis/ArchitectsOfAmytisSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { ArchitectsOfAmytisScoringDescription } from './ArchitectsOfAmytisScoringDescription'
import { Locators } from './locators/Locators'
import { Material, MaterialI18n } from './material/Material'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="architects-of-amytis"
      Rules={ArchitectsOfAmytisRules}
      optionsSpec={ArchitectsOfAmytisOptionsSpec}
      GameSetup={ArchitectsOfAmytisSetup}
      material={Material}
      materialI18n={MaterialI18n}
      locators={Locators}
      animations={gameAnimations}
      tutorial={new Tutorial()}
      scoring={new ArchitectsOfAmytisScoringDescription()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
