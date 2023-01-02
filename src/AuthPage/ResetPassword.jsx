import React from 'react';
import { Link } from 'react-router-dom';
  

import { connect } from 'react-redux';

import { userActions } from '../_actions';


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmpassword: '',
            submitted: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        const { confirmpassword, password } = this.state;
        const { dispatch } = this.props;
        if (password && password === confirmpassword) {
            dispatch(userActions.changePassword({ password }));
        }

    }

    changeText(e) {
        console.log(e.target);
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { requestStatus, data } = this.props;
        const { password, submitted, confirmpassword } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Change password</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="username">Password </label>
                        <input type="text" className="form-control" name="password" value={password} onChange={this.changeText} />
                        {submitted && !password &&
                            <div className="help-block">password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && ( !confirmpassword || confirmpassword !== password )  ? ' has-error' : '')}>
                        <label htmlFor="username">Confirm password </label>
                        <input type="text" className="form-control" name="confirmpassword" value={confirmpassword} onChange={this.changeText} />
                        {submitted && !confirmpassword &&
                            <div className="help-block">confirm password is required</div>
                        }

                         {submitted && confirmpassword !== password &&
                            <div className="help-block">Password and changepassword not match</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-success">Send</button>
                        {requestStatus==1 &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                       
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

const connectedResetPassword = connect(mapStateToProps)(ResetPassword);
export { connectedResetPassword as ResetPassword };