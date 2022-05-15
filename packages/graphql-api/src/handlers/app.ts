import { ApolloServer } from 'apollo-server-lambda'
import { ArtAPI } from '../datasources/artApi'
import { typeDefs } from '../schema'
import { resolvers } from '../resolvers'

const server = new ApolloServer({
  csrfPrevention: true,
  dataSources: () => ({
    artAPI: new ArtAPI()
  }),
  resolvers,
  typeDefs
})

export const handler = server.createHandler()
