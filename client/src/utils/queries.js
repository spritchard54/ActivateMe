import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query users($username: String!) {
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
      activities{
        duration
        commentText
        when
        category{
          _id
          catName
        }
        activityType{
          _id
          actName
        }
      }
    
      }
  }
`;

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      _id
      catName
    }
  }
`;

export const GET_CATEGORY = gql`
  query category ($_id: ID!) {
    categories (_id: $_id) {
      _id
      catName
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query activities {
    activities {
      _id
      duration
      commentText
      category {
        _id
        catName
      }
      activityTypes {
        _id
        actName
        user {
          _id
          username
        }
      }
    }
  }
`;

export const GET_ACTIVITY = gql`
  query activities ($_id: ID!) {
    activities (_id: $_id) {
      _id
      duration
      commentText
      category {
        _id
        catName
      }
      activityTypes {
        _id
        actName
        user {
          _id
          username
        }
      }
    }
  }
`;

export const GET_ACTIVITYTYPE = gql`
query activityTypes ($_id: ID!) {
  activityTypes (_id: $_id) {
    _id
    actName
    user {
      _id
      username
    }
  }
}
`;

export const GET_ACTIVITYTYPES = gql`
query activityTypes {
  activityTypes {
    _id
    actName
    user {
      _id
      username
    }
  }
}
`;