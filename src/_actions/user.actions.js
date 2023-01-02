import { reducerConstants, miscConstants } from '../_constants';
//import { miscConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const userActions = {
    login,
    logout,
    register,
    usersList,
    saveUser,
    socialLogin,
    forgotPassword,
    changePassword,
    emailverify
};

function login(username, password) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    console.log(user);

                    localStorage.setItem('user', JSON.stringify(user.data));

                    resolve(user.data);
                    // alert(user);
                    // history.push('/');
                },
                error => {
                    reject(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    })


    function request(user) { return { type: reducerConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: reducerConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: reducerConstants.LOGIN_FAILURE, error } }
}

function socialLogin(data) {
    return dispatch => {
        dispatch(request({}));

        userService.socialLogin(data)
            .then(
                data => {
                    dispatch(success(data));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: reducerConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: reducerConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: reducerConstants.LOGIN_FAILURE, error } }
}


function forgotPassword(data) {
    return dispatch => {


        dispatch(request({}));

        userService.forgotPassword(data)
            .then(
                data => {
                    dispatch(success(data));
                    history.push('/resetPassword');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };



    //  REQUEST: 1,
    // SUCCESS: 2,
    // FAILURE: 3
    function request(data) { return { type: miscConstants.REQUEST, data } }

    function success(data) { return { type: miscConstants.SUCCESS, data } }

    function failure(error) { return { type: miscConstants.FAILURE, error } }
}

function emailverify(data, type) {
    return dispatch => new Promise((resolve, reject) => {


        dispatch(request({}));
        //const type=data.type;
        // data.type;

        userService.emailverify(data)
            .then(
                user => {
                    dispatch(success(user));
                    console.log(user);


                    resolve(user.data);
                    localStorage.setItem('user', JSON.stringify(user.data));


                    const res = user.data;
                    let company = '';
                    if (localStorage.getItem('selectedcompany')) {
                        company = JSON.parse(localStorage.getItem('selectedcompany'));
                    }
                    console.log(company);
                    console.log(res.companies);
                    if (res.companies && res.companies.length) {
                        if (company) {
                            let isfount = -1;
                            for (let i = 0; i < res.companies.length; i++) {
                                if (res.companies[i]._id === company._id) {
                                    isfount = i;
                                }
                                if (isfount < 0) {
                                    localStorage.setItem('selectedcompany', JSON.stringify(res.companies[0]));

                                }

                            }

                        } else {
                            localStorage.setItem('selectedcompany', JSON.stringify(res.companies[0]));



                        }
                    } else {

                        if (type == 2) {
                            localStorage.setItem('selectedcompany', "");
                            history.push('/companyadd/0')
                            return;
                        }


                    }



                    if (type == 2) {
                        history.push('/');
                    } else {
                        history.push('/resetPassword');

                    }

                    // alert(user);

                },
                error => {
                    reject(error);

                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    history.push('/login');
                }
            );
    });



    //  REQUEST: 1,
    // SUCCESS: 2,
    // FAILURE: 3
    function request(data) { return { type: miscConstants.REQUEST, data } }

    function success(data) { return { type: miscConstants.SUCCESS, data } }

    function failure(error) { return { type: miscConstants.FAILURE, error } }
}


function changePassword(data) {
    return dispatch => {


        dispatch(request({}));

        userService.updateprofile(data)
            .then(
                data => {
                    console.log(data);
                    dispatch(success(data));
                    //  history.push('/resetPassword');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    //  REQUEST: 1,
    // SUCCESS: 2,
    // FAILURE: 3
    function request(data) { return { type: miscConstants.REQUEST, data } }

    function success(data) { return { type: miscConstants.SUCCESS, data } }

    function failure(error) { return { type: miscConstants.FAILURE, error } }
}


function logout() {
    userService.logout();
    return { type: reducerConstants.LOGOUT };
}

function register(user) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    console.log(user);

                    localStorage.setItem('user', JSON.stringify(user.data));

                    resolve(user.data);
                    // alert(user);
                    // history.push('/');
                },
                error => {
                    reject(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    });



    function request(user) { return { type: reducerConstants.REGISTER_REQUEST, user } }

    function success(user) { return { type: reducerConstants.REGISTER_SUCCESS, user } }

    function failure(error) { return { type: reducerConstants.REGISTER_FAILURE, error } }
}

function usersList(userObj) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch({
                type: reducerConstants.USERLIST_REQUEST,
                userObj
            });

            userService.usersList(userObj).then(
                data => {
                    dispatch({
                        type: reducerConstants.USERLIST_SUCCESS,
                        data
                    });
                    resolve(data);
                },
                error => {
                    dispatch({
                        type: reducerConstants.USERLIST_FAILURE,
                        error
                    });
                    reject(error);
                    dispatch(alertActions.error(error.toString()));
                }
            );
        });
}

function saveUser(userObj) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch({
                type: reducerConstants.SAVEUSER_REQUEST,
                userObj
            });

            userService.saveUser(userObj).then(
                data => {
                    dispatch({
                        type: reducerConstants.SAVEUSER_SUCCESS,
                        data
                    });
                    resolve(data);
                    dispatch(alertActions.success(data.message.toString()));
                },
                error => {
                    dispatch({
                        type: reducerConstants.SAVEUSER_FAILURE,
                        error
                    });
                    reject(error);
                    dispatch(alertActions.error(error.toString()));
                }
            );
        });
}

// prefixed function name with underscore because delete is a reserved word in javascript