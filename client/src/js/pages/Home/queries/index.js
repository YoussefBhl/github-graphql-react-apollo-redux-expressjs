import gql from 'graphql-tag';
export const githubQueries = {
  getUserDetail: gql`
    query { 
      viewer { 
        login
        avatarUrl
      }
    }`
};