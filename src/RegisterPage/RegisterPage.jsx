import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, miscActions } from '../_actions';
import Select from 'react-select';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                company_name: '',
                phone: '',
                email: '',
                password: '',
                confirmpassword: '',
                agreed: false
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        if (name == 'agreed') {
            this.setState({
                user: {
                    ...user,
                    agreed: event.target.checked
                }
            });
        } else {
            this.setState({
                user: {
                    ...user,
                    [name]: value
                }
            });
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
    }

    handleSubmit(event) {
        const { user } = this.state;
        const { dispatch } = this.props;
        console.log('------------', user);
        event.preventDefault();
        const _this = this;

        this.setState({ submitted: true });

        if (user.name && user.company_name && user.email && user.phone && user.password && user.password == user.confirmpassword && user.agreed) {
            let objCopy = Object.assign({}, user);
            delete objCopy.confirmpassword;
            delete objCopy.agreed;
            // console.log(objCopy);
            dispatch(userActions.register(objCopy)).then(function () {
                _this.setState({ success: true });
            })
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;

        return (
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="logo-box-auth">

                        <div className="logo-box">
                            <img src="/dist/assets/img/logo.png" />
                            {/* <span> Ship Easy </span> */}
                        </div>
                    </div>
                    <div className="login-box">
                        <h2>Register</h2>
                        <form name="form" onSubmit={this.handleSubmit} autocomplete="off">

                            <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                                {submitted && !user.name &&
                                    <div className="help-block">Name is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !user.company_name ? ' has-error' : '')}>
                                <label htmlFor="company_name">Company Name</label>
                                <input type="text" className="form-control" name="company_name" value={user.company_name} onChange={this.handleChange} />
                                {submitted && !user.company_name &&
                                    <div className="help-block">Company Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.phone ? ' has-error' : '')}>
                                <label htmlFor="phone">Mobile Number</label>
                                <input type="tel" className="form-control" name="phone" value={user.phone} onChange={this.handleChange} />
                                {submitted && !user.phone &&
                                    <div className="help-block">Phone is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange}  autoComplete="new-password"/>
                                        {submitted && !user.password &&
                                            <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">

                                    <div className={'form-group' + (submitted && user.confirmpassword != user.password && user.password ? ' has-error' : '')}>
                                        <label htmlFor="confirmpassword">Confirm Password</label>
                                        <input type="password" className="form-control" name="confirmpassword" value={user.confirmpassword} onChange={this.handleChange} />
                                        {submitted && user.confirmpassword != user.password && user.password &&
                                            <div className="help-block">Password does not match</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={'form-group' + (submitted && !user.agreed ? ' has-error' : '')}>
                                <input type="checkbox" name="agreed" checked={user.agreed} onChange={this.handleChange} />
                                <label htmlFor="agreed">&nbsp; I have read and agree to the terms and conditions.</label>
                                {submitted && !user.agreed &&
                                    <div className="help-block">Please read and check this option</div>
                                }
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary width-100">Register</button>
                                {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <Link to="/login" className="btn btn-link">Cancel</Link>
                            </div>
                        </form>

                        {!!this.state.success &&
                            <div className="modal " style={{ display: 'block', background: ' rgba(133, 187, 255, 0.5)' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            Email conformation
                                        </div>
                                        <div className="modal-body">
                                            <p>
                                                User Registered Successfully  <br />Please check your mail
                                            </p>
                                        </div>
                                        <div className="modal-footer">
                                            <br />
                                            <Link to="/" > OK </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };