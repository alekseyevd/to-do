import {config} from '../../config'
import request from './Request'

class Api {
  constructor(config) {
    this.developer = config.developer
    this.baseUrl = config.baseUrl
    this.fetch = request.create({
      baseUrl: config.baseUrl
    })
  }

  async get (params) {
    let response = await this.fetch({
      url: `/?developer=${this.developer}&`,
      data: params
    }) 
    if (response.status === 'error') throw new Error(response.message)
    return response
  }

  async createTask (data) {
    let response = await this.fetch({
      url: `/create?developer=${this.developer}`,
      method: 'POST',
      data
    })
    if (response.status === 'error') {
      let message = Object.keys(response.message)
        .map(key => `${key}: ${response.message[key]}\r\n`)
        .join('')
      throw new Error(message)
    }
    return response
  }

  async login (data) {
    let response = await this.fetch({
      url: `/login?developer=${this.developer}`,
      method: 'POST',
      data
    })
    if (response.status === 'error') {
      let message = Object.keys(response.message)
        .map(key => `${key}: ${response.message[key]}\r\n`)
        .join('')
      throw new Error(message)
    }
    return response
  }

  async update (id, data) {
    console.log(data);
    let response = await this.fetch({
      url: `/edit/${id}?developer=${this.developer}`,
      method: 'POST',
      data
    })
    if (response.status === 'error') throw new Error(response.message)

    return response
  }
}

export default new Api({
  baseUrl: config.baseUrl,
  developer: config.developer
})
