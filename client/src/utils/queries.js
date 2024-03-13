import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      catName
    }
  }
`;

export const GET_ACTIVITYTYPE = gql`
query activityTypes {
  activityTypes {
    _id
    actName
  }
}
`;