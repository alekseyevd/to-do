import { config } from "../config"

class StateProcessor {
  constructor(name) {
    this.name = name
  }

  get(param) {
    const state = localStorage.getItem(this.name)
    if (!state) return undefined

    try {
      return JSON.parse(state)[param]
    } catch (error) {
      return undefined
    }
  }

  saveState(data) {
    localStorage.setItem(this.name, JSON.stringify(data))
  }
}

export default new StateProcessor(config.stateName)