import gql from 'graphql-tag';
export const githubQueries = {
  getRepositoryContents: gql`
    query repository($repoName: String!, $path: String!, $owner: String!) {
      repository(name: $repoName, owner: $owner){
        stargazers {
          totalCount
        }
        watchers {
          totalCount
          }
        id
        viewerHasStarred
        viewerSubscription
        object(expression: $path) {
          ... on Tree{
            entries{
              name
              type
              mode
            }
          }
      }
    }
  }`,
  getRepositoryDetail: gql`
  query repository($repoName: String!, $owner: String!) {
    repository(name: $repoName, owner: $owner){
      id
      stargazers {
        totalCount
      }
      watchers {
        totalCount
        }
      viewerHasStarred
      viewerSubscription
    }
  }`,
  addStar: gql`
    mutation AddStar($repositoryId: ID!) {
      addStar(input: { starrableId: $repositoryId }) {
        starrable {
          id
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }`,
  removeStar: gql`
    mutation removeStar($repositoryId: ID!) {
      removeStar(input: { starrableId: $repositoryId }) {
        starrable {
          id
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }`,
    updateSub: gql`
    mutation updateSubscription($repositoryId: ID!, $subState: SubscriptionState!) {
      updateSubscription(input: { subscribableId: $repositoryId, state: $subState }) {
        clientMutationId
        subscribable{
          viewerSubscription
        }
      }
    }`

};