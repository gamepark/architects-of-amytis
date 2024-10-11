import { Project } from '@gamepark/architects-of-amytis/material/Project'
import { CardDescription } from '@gamepark/react-game'
import Back from '../images/cards/ProjectCardBack.jpg'
import Project1 from '../images/cards/ProjectCard1.jpg'
import Project2 from '../images/cards/ProjectCard2.jpg'
import Project3 from '../images/cards/ProjectCard3.jpg'
import Project4 from '../images/cards/ProjectCard4.jpg'
import Project5 from '../images/cards/ProjectCard5.jpg'
import Project6 from '../images/cards/ProjectCard6.jpg'
import Project7 from '../images/cards/ProjectCard7.jpg'
import Project8 from '../images/cards/ProjectCard8.jpg'
import Project9 from '../images/cards/ProjectCard9.jpg'
import Project10 from '../images/cards/ProjectCard10.jpg'
import Project11 from '../images/cards/ProjectCard11.jpg'
import Project12 from '../images/cards/ProjectCard12.jpg'
import Project13 from '../images/cards/ProjectCard13.jpg'
import Project14 from '../images/cards/ProjectCard14.jpg'
import Project15 from '../images/cards/ProjectCard15.jpg'
import Project16 from '../images/cards/ProjectCard16.jpg'
import Project17 from '../images/cards/ProjectCard17.jpg'
import Project18 from '../images/cards/ProjectCard18.jpg'
import Project19 from '../images/cards/ProjectCard19.jpg'
import Project20 from '../images/cards/ProjectCard20.jpg'


class ProjectCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.5
  backImage = Back
  images = {
    [Project.Project1]: Project1,
    [Project.Project2]: Project2,
    [Project.Project3]: Project3,
    [Project.Project4]: Project4,
    [Project.Project5]: Project5,
    [Project.Project6]: Project6,
    [Project.Project7]: Project7,
    [Project.Project8]: Project8,
    [Project.Project9]: Project9,
    [Project.Project10]: Project10,
    [Project.Project11]: Project11,
    [Project.Project12]: Project12,
    [Project.Project13]: Project13,
    [Project.Project14]: Project14,
    [Project.Project15]: Project15,
    [Project.Project16]: Project16,
    [Project.Project17]: Project17,
    [Project.Project18]: Project18,
    [Project.Project19]: Project19,
    [Project.Project20]: Project20
  }
}

export const projectCardDescription = new ProjectCardDescription()