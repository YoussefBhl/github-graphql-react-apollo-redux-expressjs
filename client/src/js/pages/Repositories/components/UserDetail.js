import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const style = {
    avatar: {
        borderRadius: '6px',
        width: '100%'
    }
}
export default class UserDetail extends React.Component {


    render() {
        return (
            <div>
                <img style={style.avatar} src={this.props.avatarUrl} />
                <h4> {this.props.login}</h4>
            </div>
        )
    }
}