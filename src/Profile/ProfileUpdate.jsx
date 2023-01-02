import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import { reducerConstants } from '../_constants';
import { history } from '../_helpers';

import { connect } from 'react-redux';

// import {testActions}  from '../_actions';

class ProfileUpdate extends React.Component {



    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);

        this.state = {
            isAdmin: false,
            user: {
                name: '',
                company_name: '',
                email: '',
                phone: '',
                password: '',
                image: ''
            },
            confirmpassword: '',
            submitted: false,
            query: {}
        };

        let user;
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
            if (user.role == 1) {
                this.state.isAdmin = true;
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.state.query._id = user._id;
        const { dispatch } = this.props;
        let _this = this;
        dispatch(userActions.usersList(this.state.query)).then(
            function (res) {
                console.log(res);
                if (res &&
                    res.data.docs &&
                    res.data.docs.length > 0) {
                    res.data.docs[0].password = '';
                    _this.setState({ user: res.data.docs[0] })
                }
            }
        );
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user, confirmpassword } = this.state;
        const { dispatch } = this.props;
        const _this = this;
        if (user.email && (user.password || user._id) && user.password == confirmpassword) {
            dispatch(userActions.saveUser(user)).then(function (res) {
                console.log(res);
                if (res.error_code == 0) {
                    history.push('/profile');
                }
            }, function (err) {
                _this.setState({
                    error: {
                        ..._this.state.error,
                        common: err.message
                    }
                })
            })
        }
    }

    render() {
        let { user, confirmpassword, submitted } = this.state;
        console.log(this.props);
        return (
            <div className="">
                <div className="card-body">
                    <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group '} >
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={user.name}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group '} >
                                    <label htmlFor="company_name">Company Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company_name"
                                        placeholder="Enter Company Name"
                                        value={user.company_name}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group '}>
                                    <label htmlFor="phone">Mobile Number</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Mobile Number"
                                        className="form-control"
                                        name="phone"
                                        value={user.phone}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={user.email}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !user.email && (
                                        <div className="help-block">Email is required</div>
                                    )} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={'form-group' + (submitted && !user.password && !user._id ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} autoComplete="new-password" />
                                    {submitted && !user.password && !user._id &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={'form-group' + (submitted && confirmpassword != user.password && user.password ? ' has-error' : '')}>
                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirmpassword" value={confirmpassword} onChange={(event) => {
                                        this.setState({
                                            confirmpassword: event.target.value
                                        })
                                    }} />
                                    {submitted && confirmpassword != user.password && user.password &&
                                        <div className="help-block">Password does not match</div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div className="form-group">
                                    <button className="btn btn-primary btn-wd">
                                        Save
                                      {this.props.requestStatus ===
                                            reducerConstants.USERADD_REQUEST && (
                                                <img
                                                    className="btn-img-loading"
                                                    src="/dist/assets/img/ajax-loader.gif"
                                                />
                                            )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>



        );
    }
}

function mapStateToProps(state) {
    const { requestStatus, userData } = state.users;
    return {
        requestStatus,
        userData
    };
}
const connectedProfileUpdate = connect(mapStateToProps)(ProfileUpdate);
export { connectedProfileUpdate as ProfileUpdate }; 