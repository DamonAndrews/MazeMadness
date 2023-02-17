const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Score {
    _id: ID
    userscore: String
    username: String

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    scores: [Score]
    score(scoreId: ID!): Score
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addScore(userScore: Int!, userName: String!): Score
  }
`;

module.exports = typeDefs;
