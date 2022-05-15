import { HarvardArtObjectsVars } from './types/harvardArtObjects'

export const resolvers = {
  Query: {
    artObjects: async (parent: any, args: HarvardArtObjectsVars, context: any) => context.dataSources.artAPI.getObjects(
      args.classification,
      args.verificationLevel,
      args.size,
      args.page
    )
  }
}
