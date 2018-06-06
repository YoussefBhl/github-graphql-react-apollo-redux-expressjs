import React from 'react';
import { githubQueries } from '../queries';
import { Query } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import StarBtn from "./StarBtn";
import SubMenu from "./SubMenu";

const style = {
    inlineFlex: {
      display: "inline-flex"
    }
  }
export default class RepositoryMutations extends React.Component {

  render() {
    const repoName = this.props.repoName,
        owner = this.props.owner;
    return (
        <Query query={githubQueries.getRepositoryDetail}
             variables={{ repoName, owner }} >
          {({ data, loading, error, fetchMore }) => {
            const { viewer } = data
            if (loading && !viewer) {
              return null;
            }
            if (error) {
              return <p>
                error:
                        {error}
              </p>
            }
            return (
                <Row>
                  <Col lgOffset={4} lg={4}>
                    <h3>{repoName}</h3>
                  </Col>
                  <Col lg={4} style={style.inlineFlex}>
                    <StarBtn repoId={data.repository.id} starsCount={data.repository.stargazers.totalCount}
                      viewerHasStarred={data.repository.viewerHasStarred} />
                    <SubMenu watchersCount={data.repository.watchers.totalCount} 
                      viewerSubscription={data.repository.viewerSubscription} repoId={data.repository.id} />
                  </Col >
                </Row>
            )
          }}
        </Query>
    )
  }
}
