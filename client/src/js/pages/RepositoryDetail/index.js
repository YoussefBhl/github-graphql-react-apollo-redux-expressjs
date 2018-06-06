import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RepositoryContent from "./components/RepositoryContent";
import { Route, Router } from "react-router-dom";
import RepositoryMutations from "./components/RepositoryMutations";

const style = {
  inlineFlex: {
    display: "inline-flex"
  }
}

export default class RepositoryDetail extends React.Component {
  render() {
    /*pathname used to get the owener, the repositry name 
      and create the new path wich will used to navigate sub repositories*/
    const pathname = this.props.location.pathname;
    const splitedPath = pathname.split("/");
    const owner = splitedPath[1];
    const repoName = splitedPath[3];
    let path = splitedPath[2] + ":";
    return (
        <Grid>
        <RepositoryMutations owner={owner} repoName={repoName} />
        <Col lgOffset={3} lg={8}>
        <RepositoryContent path={path} owner={owner} firstPage={true}
                  repoName={repoName}   />
       </Col>
      </Grid>
    )
  }
}
