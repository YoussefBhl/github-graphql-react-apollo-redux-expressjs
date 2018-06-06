import React from 'react'
import { githubQueries } from '../queries'
import { Query, Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { Glyphicon, Row, Col, Grid, Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

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
export default class StarBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsCount: this.props.starsCount,
      viewerHasStarred: this.props.viewerHasStarred
    };
  }

  render() {
    let { starsCount, viewerHasStarred } = this.state;
    if (!viewerHasStarred)
      return (
        <Mutation mutation={githubQueries.addStar} variables={{ repositoryId: this.props.repoId }} >
          {(clickBtn, { data }) => {
            const handleClick = (e) => {
              let { starsCount, viewerHasStarred } = this.state;
              viewerHasStarred = !viewerHasStarred;
              starsCount++;
              clickBtn();
              this.setState({ viewerHasStarred, starsCount })
            }
            return (
              <div style={style.marginRight}>
                <Button type="submit" onClick={handleClick}> <Glyphicon glyph="star" /> &nbsp; Star
                </Button> <p style={style.socialCount}> {starsCount}</p>
              </div>
            )
          }}
        </Mutation>
      )
    else
      return (
        <Mutation mutation={githubQueries.removeStar} variables={{ repositoryId: this.props.repoId }} >
          {(clickBtn, { data }) => {
            const handleClick = (e) => {
              let { starsCount, viewerHasStarred } = this.state;
              viewerHasStarred = !viewerHasStarred;
              starsCount--;
              clickBtn();
              this.setState({ viewerHasStarred, starsCount })
            }
            return (
              <div style={style.marginRight}>
                <Button type="submit" onClick={handleClick}> <Glyphicon glyph="star" /> &nbsp; UnStar
              </Button> <p style={style.socialCount}> {starsCount}</p>
              </div>
            )
          }}
        </Mutation>
      )
  }
}
