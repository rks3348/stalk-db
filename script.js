import { ApolloServer } from 'apollo-server-express';
// import { Query } from './resolvers/Query';
// import { Mutation } from './resolvers/Mutation';
// import { User } from './resolvers/User';
// import { Link } from './resolvers/Link';

const resolvers = {
    Query,
    Mutation,
    User,
    Link
}

const server = new ApolloServer({
    typeDefs: `
    type Mutation {
        post(url: String!, description: String!): Link!
        signup(email: String!, password: String!, name: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
      }
      
      type AuthPayload {
        token: String
        user: User
      }
      
      type User {
        id: ID!
        name: String!
        email: String!
        links: [Link!]!
      }
      
      type Link {
        id: ID!
        description: String!
        url: String!
        postedBy: User
      }`,
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma
        };
    }
});