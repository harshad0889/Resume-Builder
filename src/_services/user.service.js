import config from 'config';
import { authHeader } from '../_helpers';
import { apiConstants } from '../_constants';

export const userService = {
    login,
    logout,
    register,
    usersList,
    saveUser,
    getById,
    updateprofile,
    socialLogin,
    forgotPassword,
    changePassword,
    emailverify
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(apiConstants.apiUrl + '/iapi/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user.data);

            // login successful if there's a jwt token in the response
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');

    console.log(localStorage.getItem('user'));

}

function emailverify(data) {
    console.log(data);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(apiConstants.apiUrl + '/iapi/emailverify', requestOptions).then(handleResponse);

}

function usersList(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
return fetch(apiConstants.apiUrl+'/iapi/getuserList', requestOptions).then(handleResponse );
}

function saveUser(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
return fetch(apiConstants.apiUrl+'/iapi/saveuser', requestOptions).then(handleResponse );
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiConstants.apiUrl + '/users/${id}', requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(apiConstants.apiUrl + '/iapi/register', requestOptions).then(handleResponse);
}

function updateprofile(user) {
    console.log(user);

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(apiConstants.apiUrl + '/iapi/updateprofile', requestOptions).then(handleResponse);

}

function socialLogin(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(apiConstants.apiUrl + '/iapi/socialauth', requestOptions).then(handleResponse);
}

function forgotPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(apiConstants.apiUrl + '/iapi/sendforgotpassword', requestOptions).then(handleResponse);

}

function changePassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(apiConstants.apiUrl + '/iapi/sendforgotpassword', requestOptions).then(handleResponse);

}



function handleResponse(response) {
    return response.text().then(text => {



        const data = text && JSON.parse(text);
        console.log(data);

        if (data.error_code !== 0) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.message;

            return Promise.reject(error);
        }

        return data;
    });
}