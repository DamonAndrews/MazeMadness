import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      scores {
        _id
        userScore
      }
    }
  }`;

export const QUERY_SCORES = gql`
  query score {
    scores {
      _id
      userScore
      userName
    }
  }`;

export const QUERY_SINGLE_SCORE = gql`
  query getSingleScore($scoreId: ID!) {
    score (scoreId: $scoreId) {
      _id
      userScore
      userName
      }
    }`;
