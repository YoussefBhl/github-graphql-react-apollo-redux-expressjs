import gql from 'graphql-tag';
export const githubQueries = {
    getRepositories: gql`
    query {
      viewer {
        login
        avatarUrl
         repositories(first: 50) {
            edges {
              node {
                defaultBranchRef {
                  name
                }
                primaryLanguage {
              	  name
              	}
                name
                description 
              }
            }
          }
        }
      }`
};