import React from "react";
import { Jumbotron, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const style = {
  textSmall: {
    fontSize: "12px"

  },
  box: {
    backgroundColor: "white",
    color: "#24292e",
    borderRadius: "3px",
    borderColor: "#d1d5da",
    border: "1px #e1e4e8 solid"
  },
  circle: {
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    background: "black"
  },
  inlineDiv: {
    display: "inline-flex",
  }
}

export default class RepositoriesList extends React.Component {

  render() {
    return (
      <div>
        {this.props.repositories.map((el, i) => {
          let primaryLanguage = "";
          if (el.node.primaryLanguage)
            primaryLanguage = <div style={style.inlineDiv}> <div style={style.circle} /> &nbsp;
            <p style={style.textSmall}>{el.node.primaryLanguage.name} </p> </div>;
          return (
            <Col key={i} lg={6}>
              <Jumbotron style={style.box}>
                <Link to={this.props.login + "/" + el.node.defaultBranchRef.name + "/" + el.node.name} ><h4>{el.node.name}</h4></Link>
                <p style={style.textSmall}>
                  {el.node.description}
                </p>
                {primaryLanguage}
              </Jumbotron>
            </Col>
          )
        })}
      </div>
    )
  }
}
