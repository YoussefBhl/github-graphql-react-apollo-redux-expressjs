import React from "react";
import { githubQueries } from "./queries";
import { Query } from "react-apollo";
import { userActions } from "../../actions/user.actions";
import { Row, Col, Grid } from "react-bootstrap";
import UserDetail from "./components/UserDetail";
import RepositoriesList from "./components/RepositoriesList";

export default class Repositories extends React.Component {

  render() {
    return (
        <Grid>
        <Query query={githubQueries.getRepositories} notifyOnNetworkStatusChange={true}>
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
              <div>
                 <Row>
                  <Col lgOffset={4} lg={4}>
                    <h1>repositories</h1>
                  </Col>
                </Row>
                <Col lg={3}>
                <UserDetail avatarUrl={data.viewer.avatarUrl} login={data.viewer.login} />
                </Col>
                <Col lg={8}>
                <RepositoriesList repositories={data.viewer.repositories.edges} login={data.viewer.login} />
                </Col>
                </div>
            )
          }}
        </Query>
        </Grid>
    )
  }
}
