import React from 'react';
import { Link } from 'react-router-dom';
  

import { connect } from 'react-redux';
import { userActions } from '../_actions';


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitted: false
        };

       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeText = this.changeText.bind(this);
    }   

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email } = this.state;
        const { dispatch } = this.props;
        if (email) {
            dispatch(userActions.forgotPassword(email));
        }
    }

    changeText(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value });
    };

    render() {
        const { requestStatus,data } = this.props;
        const { email, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>change password</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="username">Email </label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.changeText} />
                        {submitted && !email &&
                            <div className="help-block">email is required</div>
                        }
                    </div>
                  
                    <div className="form-group">
                        <button className="btn btn-success">Send</button>
                        {requestStatus==1 &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Login</Link>
                    </div>
                </form>
              
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { requestStatus } = state.misc;
    return {
        requestStatus
    };
}

const connectedForgotpassword = connect(mapStateToProps)(ForgotPassword);
export { connectedForgotpassword as ForgotPassword };