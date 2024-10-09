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
      [BuildingColor.Purple, BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 8
  },
  [Project.Project2]: {
    pattern: [
      [BuildingColor.Green, null, null],
      [null, BuildingColor.Blue, null],
      [null, null, BuildingColor.Orange]
    ],
    points: 8
  },
  [Project.Project3]: {
    pattern: [
      [BuildingColor.Purple, null, BuildingColor.Purple],
      [BuildingColor.Blue, BuildingColor.Green, BuildingColor.Orange]
    ],
    points: 12
  },
  [Project.Project4]: {
    pattern: [
      [BuildingColor.Green, BuildingColor.Purple],
      [BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 10
  },
  [Project.Project5]: {
    pattern: [
      [BuildingColor.Orange, BuildingColor.Blue],
      [BuildingColor.Orange, BuildingColor.Blue]
    ],
    points: 10
  },
  [Project.Project6]: {
    pattern: [
      [BuildingColor.Purple, BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 8
  },
  [Project.Project7]: {
    pattern: [
      [BuildingColor.Green, null, null],
      [null, BuildingColor.Blue, null],
      [null, null, BuildingColor.Orange]
    ],
    points: 8
  },
  [Project.Project8]: {
    pattern: [
      [BuildingColor.Purple, null, BuildingColor.Purple],
      [BuildingColor.Blue, BuildingColor.Green, BuildingColor.Orange]
    ],
    points: 12
  },
  [Project.Project9]: {
    pattern: [
      [BuildingColor.Green, BuildingColor.Purple],
      [BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 10
  },
  [Project.Project10]: {
    pattern: [
      [BuildingColor.Orange, BuildingColor.Blue],
      [BuildingColor.Orange, BuildingColor.Blue]
    ],
    points: 10
  },
  [Project.Project11]: {
    pattern: [
      [BuildingColor.Purple, BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 8
  },
  [Project.Project12]: {
    pattern: [
      [BuildingColor.Green, null, null],
      [null, BuildingColor.Blue, null],
      [null, null, BuildingColor.Orange]
    ],
    points: 8
  },
  [Project.Project13]: {
    pattern: [
      [BuildingColor.Purple, null, BuildingColor.Purple],
      [BuildingColor.Blue, BuildingColor.Green, BuildingColor.Orange]
    ],
    points: 12
  },
  [Project.Project14]: {
    pattern: [
      [BuildingColor.Green, BuildingColor.Purple],
      [BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 10
  },
  [Project.Project15]: {
    pattern: [
      [BuildingColor.Orange, BuildingColor.Blue],
      [BuildingColor.Orange, BuildingColor.Blue]
    ],
    points: 10
  },
  [Project.Project16]: {
    pattern: [
      [BuildingColor.Purple, BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 8
  },
  [Project.Project17]: {
    pattern: [
      [BuildingColor.Green, null, null],
      [null, BuildingColor.Blue, null],
      [null, null, BuildingColor.Orange]
    ],
    points: 8
  },
  [Project.Project18]: {
    pattern: [
      [BuildingColor.Purple, null, BuildingColor.Purple],
      [BuildingColor.Blue, BuildingColor.Green, BuildingColor.Orange]
    ],
    points: 12
  },
  [Project.Project19]: {
    pattern: [
      [BuildingColor.Green, BuildingColor.Purple],
      [BuildingColor.Purple, BuildingColor.Purple]
    ],
    points: 10
  },
  [Project.Project20]: {
    pattern: [
      [BuildingColor.Orange, BuildingColor.Blue],
      [BuildingColor.Orange, BuildingColor.Blue]
    ],
    points: 10
  },
}

export const projects = getEnumValues(Project)