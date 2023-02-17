import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser(
    $username: String! 
    $password: String!) {
    login(
      username: $username, 
      password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!, 
    $email: String!, 
    $password: String!) {
    addUser(
      username: $username, 
      email: $email, 
      password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SCORE = gql`
  mutation addScore(
    $userScore: Integer!, 
    $userName: String!) {
    addScore(userScore: $userScore, 
    userName: $userName) {
      _id
      userScore
      userName
     }
      }`
