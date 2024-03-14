import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_ACTIVITY = gql`
mutation addActivity($when: String!, $duration: Float!, $commentText: String!, $category: ID!, $activityType: ID!){
  addActivity(when: $when, duration: $duration, commentText: $commentText, category: $category, activityType: $activityType){
        duration
        when
        commentText
        category{
          catName
        }
        activityType{
          actName
        }
  }
}
`