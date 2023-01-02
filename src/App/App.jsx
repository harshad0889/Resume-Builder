//import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, NotFoundRoute, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import queryString from 'query-string';
import { alertActions } from '../_actions';
import { PrivateRoute, MainMenu, Sidebar } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage, ForgotPassword, ResetPassword, EmailVerify } from '../AuthPage';
import { RegisterPage } from '../RegisterPage';


import { miscService } from '../_services';

// import { CallList } from '../Call'
import { User, UserAdd, UsersList } from '../Users';

import { Profile, ProfileUpdate } from '../Profile'; 



import { Api } from '../Api'


//import { TopicAdd, TopicList, Topic } from '../Topics';



let url_params = {};





const urlParams = new URLSearchParams(window.location.search);


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// expect intentation but  spaces font 4


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarshow: true,
            isShowAlert: true
        };

        if (window.location.pathname === '/login' ||
            window.location.pathname === '/forgotPassword' ||
            window.location.pathname === '/emailverify' ||
            !localStorage.getItem('user')) {
            this.state = {
                isSidebarshow: false
            };
        }
    }
    componentWillReceiveProps() {
        this.setState({ isShowAlert: true });
        setTimeout(function () {
            this.setState({ isShowAlert: false });
        }.bind(this), 3000);
        this.setState({ height: window.innerHeight + 'px' });

    }

    componentDidMount() {


        const { dispatch } = this.props;
        console.log(window.location);
        history.listen((location, action) => {

            //alert(getParameterByName('successMessage',location.search))

            console.log(getParameterByName('successMessage', location.search));

            url_params = miscService.getUrlVars();

            // alert(url_params);
            setTimeout(function () {
                if (getParameterByName('errorMessage', location.search)) {
                    dispatch(alertActions.error(getParameterByName('errorMessage', location.search)));
                }

                if (getParameterByName('successMessage', location.search)) {

                    dispatch(alertActions.success(getParameterByName('successMessage', location.search)));
                }
            }, 1000);

            if (location.pathname === '/login' ||
                location.pathname === '/forgotPassword' ||
                location.pathname === '/emailverify' ||
                location.pathname === '/login' ||
                !localStorage.getItem('user')) {
                this.setState(() => {
                    return { isSidebarshow: false };
                });
            } else {
                this.setState(() => {
                    return { isSidebarshow: true };
                });
            }
            console.log('listen', location.pathname);
            this.setState({ currenturl: location.pathname })

            dispatch(alertActions.clear());
        });

    }
    render() {
        const { alert } = this.props;
        const { isSidebarshow, isShowAlert } = this.state;
        console.log("app.js id executing ============")

        return (
            <div className="wrapper">
                <Router history={history} >
                    <div>

                        {isSidebarshow &&
                            <MainMenu currenturl={this.state.currenturl}></MainMenu>
                        }
                        {isSidebarshow && <Sidebar currenturl={this.state.currenturl}></Sidebar>}

                        <div className={'main-panel ' + (isSidebarshow ? 'showsidebar ' : 'hiddensidebar bg-dark no-padding')} >

                            <div className="content ">
                                <div className="">
                                    <div className="alertBox">
                                        {alert.message && isShowAlert &&
                                            <div className={`alert alertBoxInner ${alert.type}`}>{alert.message}</div>
                                        }
                                    </div>

                                    <div>
                                        <Switch>
                                            <PrivateRoute exact path="/" component={HomePage} />
                                            <Route path="/login" component={LoginPage} />
                                            <Route path="/register" component={RegisterPage} />
                                           

                                            {/* user */}
                                            <PrivateRoute path="/profile" component={Profile} />
                                            <PrivateRoute path="/profileupdate" component={ProfileUpdate} />

                                            <PrivateRoute path="/user/:id" component={User} />
                                            <PrivateRoute path="/useradd/:id" component={UserAdd} />
                                            <PrivateRoute path="/userslist" component={UsersList} />

                                 
                                            <PrivateRoute render={() => <h1>404 Error</h1>} />
                                        </Switch>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };