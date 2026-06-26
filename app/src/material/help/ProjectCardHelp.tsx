
import { Project, projectsProperties } from "@gamepark/architects-of-amytis/material/Project"
import { MaterialHelpProps } from "@gamepark/react-game"
import { Trans, useTranslation } from "react-i18next"

export const ProjectCardHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('project-card')}</h2>
      <p>
        <Trans 
          i18nKey="project-card.help"
          components={{
            bold: <strong/>
          }}
        ></Trans>
      </p>
      { item.id !== undefined &&
        <p>
          <Trans 
            i18nKey="project-card.score"
            values={{score: projectsProperties[item.id as Project].points
            }}
            components={{
              bold: <strong/>
            }}
          ></Trans>
        </p>
      }
      <p>{t('project-card.rotate')}</p>
    </>
  )
}
