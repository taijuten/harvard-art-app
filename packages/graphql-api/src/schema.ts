import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  type ArtObject {
    id: ID!,
    creditline: String,
    title: String!,
    rank: Int!,
    primaryimageurl: String,
    images: [Image],
    classification: String!,
    url: String
  }

  type Image {
    baseimageurl: String
  }

  type Query {
    artObjects(page: Int): [ArtObject]
  }
`
