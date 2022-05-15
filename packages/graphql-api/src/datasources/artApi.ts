import { RESTDataSource } from 'apollo-datasource-rest'
import { HarvardArtObjectsData } from '../types/harvardArtObjects'
const API_KEY = process.env['API_KEY']

const DEFAULTS = {
    CLASSIFICATION: 'Prints',
    VERIFICATION_LEVEL: 4,
    SIZE: 10,
    PAGE: 1,
    HAS_IMAGE: 1,
    SORT: 'rank'
}

// See packages/graphql-api/README.md for explanation of this in-lambda caching functionality
const cachedRequests:{
  [key: string]: HarvardArtObjectsData
} = {}

export class ArtAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.harvardartmuseums.org'
  }

  async getObjects (
    classification: string = DEFAULTS.CLASSIFICATION,
    verificationLevel: number = DEFAULTS.VERIFICATION_LEVEL,
    size: number = DEFAULTS.SIZE,
    page: number = DEFAULTS.PAGE
  ):Promise<HarvardArtObjectsData> {
    const cacheKey = `${classification}-${verificationLevel}-${size}-${page}`
    if (cachedRequests[cacheKey] !== undefined) return cachedRequests[cacheKey]
    const data = await this.get('object', {
      apikey: API_KEY,
      classification,
      page,
      size,
      q: `verificationlevel:${verificationLevel}`,
      hasimage: DEFAULTS.HAS_IMAGE,
      sort: DEFAULTS.SORT
    })
    cachedRequests[cacheKey] = data.records
    return data.records
  }
}
