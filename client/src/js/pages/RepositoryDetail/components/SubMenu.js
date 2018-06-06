import React from 'react';
import { githubQueries } from '../queries';
import { Query, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Glyphicon, Row, Col, Grid, Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Navbar, NavItem, DropdownButton, MenuItem, Nav } from 'react-bootstrap';

const style = {
  socialCount: {
    float: 'right',
    verticalAlign: "middle",
    padding: '7px 10px',
    fontSize: '12px',
    color: '#24292e',
    backgroundColor: '#fff',
    border: '1px solid rgba(27,31,35,0.2)',
    borderTopRightRadius: "3px",
    borderBottomRightadius: "3px",
  },
  marginRight: {
    marginRight: "20px"
  }
}
export default class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    const subState = this.props.viewerSubscription,
      watchersCount = this.props.watchersCount;
    let watchText = "";
    if (subState == "SUBSCRIBED") watchText = "Unwatch";
    else if (subState == "UNSUBSCRIBED") watchText = "watch";
    else watchText = "Stop ignoring";
    this.state = {
      watchText,
      watchersCount,
      subState
    };
  }
  render() {
    let watchText = this.state.watchText,
      subMutation = githubQueries.updateSub;

    // 
    return (
      <Mutation mutation={subMutation} >
        {(updateSub, { data }) => {
          const handelMenuItem = (eventKey) => {
            let subState = this.state.subState,
              watchersCount = this.state.watchersCount;
            if (eventKey == 1 || eventKey == 3) {
              if (subState == "SUBSCRIBED" && watchersCount > 0) watchersCount--;
              if (eventKey == 1) {
                watchText = "Watch";
                subState = "UNSUBSCRIBED";
              }
              else {
                subState = "IGNORED";
                watchText = "Stop ignoring";
              }
            }
            else {
              if (subState != "SUBSCRIBED") {
                watchersCount++;
                watchText = "Unwatch";
              }
              subState = "SUBSCRIBED";

            }
            updateSub({ variables: { repositoryId: this.props.repoId, subState } });
            this.setState({ watchText, watchersCount, subState })
          }
          return (
            <div style={style.marginRight}>
              <DropdownButton title={this.state.watchText} id='basic-nav-dropdown'>
                <MenuItem eventKey="1" onSelect={handelMenuItem}>Not watching</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2" onSelect={handelMenuItem}>Watching</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3" onSelect={handelMenuItem}>Ignoring</MenuItem>
              </DropdownButton><p style={style.socialCount}> {this.state.watchersCount}</p>
            </div>
          )
        }}
      </Mutation>
    )
  }
}
