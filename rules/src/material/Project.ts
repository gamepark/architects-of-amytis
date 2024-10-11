import { getEnumValues } from '@gamepark/rules-api'
import { BuildingColor } from './Building'

export enum Project {
  Project1 = 1,
  Project2,
  Project3,
  Project4,
  Project5,
  Project6,
  Project7,
  Project8,
  Project9,
  Project10,
  Project11,
  Project12,
  Project13,
  Project14,
  Project15,
  Project16,
  Project17,
  Project18,
  Project19,
  Project20
}

export const projectsProperties = {
  [Project.Project1]: {
    pattern: [
      [BuildingColor.Green, null, null],
      [null, BuildingColor.Blue, null],
      [null, null, BuildingColor.Orange]
    ],
    points: 8
  },
  [Project.Project2]: {
    pattern: [
      [BuildingColor.Blue, null, null],
      [null, BuildingColor.Orange, null],
      [null, null, BuildingColor.Green]
    ],
    points: 8
  },
  [Project.Project3]: {
    pattern: [
      [BuildingColor.Blue, BuildingColor.Blue, BuildingColor.Blue]    ],
    points: 8
  },
  [Project.Project4]: {
    pattern: [
      [BuildingColor.Purple, BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 8
  },
  [Project.Project5]: {
    pattern: [
      [BuildingColor.Orange, null],
      [BuildingColor.Orange, BuildingColor.Orange]
    ],
    points: 8
  },
  [Project.Project6]: {
    pattern: [
      [BuildingColor.Green, null],
      [BuildingColor.Green, BuildingColor.Green]
    ],
    points: 8
  },
  [Project.Project7]: {
    pattern: [
      [BuildingColor.Green, BuildingColor.Purple],
      [BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 10
  },
  [Project.Project8]: {
    pattern: [
      [BuildingColor.Orange, null, BuildingColor.Blue],
      [BuildingColor.Orange, BuildingColor.Blue]
    ],
    points: 10
  },
  [Project.Project9]: {
    pattern: [
      [BuildingColor.Orange, BuildingColor.Purple, BuildingColor.Purple],
      [BuildingColor.Purple, null, null]
    ],
    points: 10
  },
  [Project.Project10]: {
    pattern: [
      [BuildingColor.Orange, BuildingColor.Green, BuildingColor.Green],
      [BuildingColor.Orange, null, null]
    ],
    points: 10
  },
  [Project.Project11]: {
    pattern: [
      [null, BuildingColor.Orange, BuildingColor.Orange],
      [BuildingColor.Orange, BuildingColor.Blue, null]
    ],
    points: 10
  },
  [Project.Project12]: {
    pattern: [
      [null, BuildingColor.Purple, BuildingColor.Purple],
      [BuildingColor.Blue, BuildingColor.Blue, null]
    ],
    points: 10
  },
  [Project.Project13]: {
    pattern: [
      [null, BuildingColor.Blue, null],
      [BuildingColor.Blue, null, BuildingColor.Blue]
    ],
    points: 10
  },
  [Project.Project14]: {
    pattern: [
      [null, BuildingColor.Green, null],
      [BuildingColor.Purple, BuildingColor.Green, BuildingColor.Purple]
    ],
    points: 10
  },
  [Project.Project15]: {
    pattern: [
      [BuildingColor.Purple, BuildingColor.Blue, BuildingColor.Green],
      [BuildingColor.Orange, null, null],
      [BuildingColor.Orange, null, null]      
    ],
    points: 12
  },
  [Project.Project16]: {
    pattern: [
      [BuildingColor.Purple, BuildingColor.Purple, BuildingColor.Orange],
      [BuildingColor.Green, BuildingColor.Green, null]
    ],
    points: 12
  },
  [Project.Project17]: {
    pattern: [
      [BuildingColor.Blue, BuildingColor.Purple, BuildingColor.Blue],
      [null, BuildingColor.Green, null],
      [null, BuildingColor.Blue, null]
    ],
    points: 12
  },
  [Project.Project18]: {
    pattern: [
      [BuildingColor.Blue, null, null],
      [BuildingColor.Blue, BuildingColor.Green, null],
      [null, BuildingColor.Green, BuildingColor.Orange]
    ],
    points: 12
  },
  [Project.Project19]: {
    pattern: [
      [null, BuildingColor.Purple, null],
      [BuildingColor.Blue, BuildingColor.Green, BuildingColor.Orange],
      [null, BuildingColor.Green, null]
    ],
    points: 12
  },
  [Project.Project20]: {
    pattern: [
      [BuildingColor.Purple, null, BuildingColor.Purple],
      [BuildingColor.Blue, BuildingColor.Green, BuildingColor.Orange]
    ],
    points: 12
  },
}

export const projects = getEnumValues(Project)