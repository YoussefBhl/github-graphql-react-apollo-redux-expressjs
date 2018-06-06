import { userConstants } from '../constants/user.constants';
import { history } from '../common/history';


const login = (token) => {
    const success = (token) => ({ type: userConstants.LOGIN_SUCCESS, token })
    return dispatch => {
        var self = this;
        localStorage.setItem('token', token);
        dispatch(success(token));
        history.push('/');
    }
}

export const userActions = {
    login,
    logout
};

function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        window.location = 'http://127.0.0.1:8080';
        return { type: userConstants.LOGOUT };
    }
}