import React from 'react';
import { githubQueries } from '../queries';
import { Query } from 'react-apollo';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import { userActions } from '../../../actions/user.actions';

const style = {
  navBar: {
    borderRadius: '0px'
  },
  dropdownText: {
    color: '#586069',
    display: 'block',
    padding: '3px 20px',
    clear: 'both',
    fontWeight: '400'
  },
  currentUserStrong: {
    fontWeight: '600'
  }
}

class Header extends React.Component {
  handelClickLogout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
  render() {
    return (
      <Query query={githubQueries.getUserDetail} notifyOnNetworkStatusChange={true}>
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
          const img = <img src={data.viewer.avatarUrl} width={25} height={25} />
          localStorage.setItem('user', data.viewer.login);
          return (
            <Navbar inverse collapseOnSelect style={style.navBar}>
              <Navbar.Header>
                <Navbar.Brand>
                <Link to='/'>Github GrahpQL test </Link>
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavDropdown eventKey={1} title={img} id='basic-nav-dropdown'>
                    <p style={style.dropdownText}>Signed in as </p>
                    <p style={{ ...style.dropdownText, ...style.currentUserStrong }}>
                      {data.viewer.login}</p>
                    <MenuItem divider />
                    <MenuItem eventKey="1.1" onClick={this.handelClickLogout}>Logout</MenuItem>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

          )
        }}
      </Query>
    )
  }
}

function mapStateToProps (state) {
  const { loggingIn } = state.authentication
  return {
  loggingIn}
}
Header = connect(mapStateToProps)(Header)
export default Header;