import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../_actions';

class SocialLogin extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }


    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };
    
    twitterResponse = (e) => {};

    facebookResponse = (e) => {};

    googleResponse = (e) => {
        console.log(e);

         this.props.dispatch(userActions.socialLogin(e));
    };
    onFailure = (error) => {
      alert(error);
    }
    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                                   onFailure={this.twitterResponse} onSuccess={this.twitterResponse}
                                   requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"/>
                    <FacebookLogin
                        appId="XXXXXXXXXX"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} />
                    <GoogleLogin
                        clientId="402903593741-es0dsvrr0o63pi2tm97b58fe8dspf08r.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(SocialLogin);
export { connectedLoginPage as SocialLogin }; 