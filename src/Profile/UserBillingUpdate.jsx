import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import { reducerConstants } from '../_constants';
import { history } from '../_helpers';

import { connect } from 'react-redux';

// import {testActions}  from '../_actions';

class UserBillingUpdate extends React.Component {



    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);

        this.state = {
            isAdmin: false,
            billing_details: {
                gstn: '',
                business_name: '',
                business_address: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                contact_person: '',
                contact_number: '',
                contact_email: '',
                no_gst: false
            },
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
                    res.data.docs.length == 1) {
                    if (res.data.docs[0].billing_details) {
                        _this.state.billing_details = res.data.docs[0].billing_details;
                        _this.setState({ billing_details: res.data.docs[0].billing_details });
                    }
                }
            }
        );
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { billing_details } = this.state;
        if (name == 'no_gst') {
            this.setState({
                billing_details: {
                    ...billing_details,
                    no_gst: event.target.checked
                }
            });
        } else {
            this.setState({
                billing_details: {
                    ...billing_details,
                    [name]: value
                }
            });
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { billing_details } = this.state;
        const { dispatch } = this.props;
        const _this = this;
        if (billing_details.gstn && billing_details.business_name && billing_details.business_address && billing_details.country && billing_details.state && billing_details.city && billing_details.pincode && billing_details.contact_person && billing_details.contact_number && billing_details.contact_email) {
            let user = {};
            if (localStorage.getItem('user')) {
                user._id = JSON.parse(localStorage.getItem('user'))._id;
                user.billing_details = billing_details;
            }
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
        let { billing_details, submitted } = this.state;
        return (
            <div className="">
                <div className="card-body">
                    <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.gstn ? ' has-error' : '')} >
                                    <label htmlFor="gstn">GSTN*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="gstn"
                                        placeholder="Enter GSTN"
                                        value={billing_details.gstn}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.gstn && (
                                        <div className="help-block">GSTN is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.business_name ? ' has-error' : '')} >
                                    <label htmlFor="business_name">Legal Business Name*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="business_name"
                                        placeholder="Enter Legal Business Name"
                                        value={billing_details.business_name}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.business_name && (
                                        <div className="help-block">Business Address is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.business_address ? ' has-error' : '')}>
                                    <label htmlFor="business_address">Business Address*</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Business Address"
                                        className="form-control"
                                        name="business_address"
                                        value={billing_details.business_address}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.business_address && (
                                        <div className="help-block">Business Address is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.city ? ' has-error' : '')}>
                                    <label htmlFor="city">City*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        placeholder="Enter City"
                                        value={billing_details.city}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.city && (
                                        <div className="help-block">City is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.state ? ' has-error' : '')}>
                                    <label htmlFor="state">State*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        placeholder="Enter State"
                                        value={billing_details.state}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.state && (
                                        <div className="help-block">State is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.country ? ' has-error' : '')}>
                                    <label htmlFor="country">Country*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        placeholder="Enter Country"
                                        value={billing_details.country}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.country && (
                                        <div className="help-block">Country is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.pincode ? ' has-error' : '')}>
                                    <label htmlFor="country">Pincode*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="pincode"
                                        placeholder="Enter Pincode"
                                        value={billing_details.pincode}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.pincode && (
                                        <div className="help-block">Pincode is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <input type="checkbox" name="no_gst" checked={billing_details.no_gst} onChange={this.handleChange} />
                            <label htmlFor="no_gst">&nbsp; No GST?</label>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.contact_person ? ' has-error' : '')}>
                                    <label htmlFor="contact_person">Contact Person*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contact_person"
                                        placeholder="Enter Contact Person"
                                        value={billing_details.contact_person}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.contact_person && (
                                        <div className="help-block">Contact Person is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.contact_number ? ' has-error' : '')}>
                                    <label htmlFor="contact_number">Contact Number*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contact_number"
                                        placeholder="Enter Contact Number"
                                        value={billing_details.contact_number}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.contact_number && (
                                        <div className="help-block">Contact Number is required</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pr-1">
                                <div
                                    className={
                                        'form-group ' + (submitted && !billing_details.contact_email ? ' has-error' : '')}>
                                    <label htmlFor="contact_email">Contact Email*</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="contact_email"
                                        placeholder="Enter Contact Email"
                                        value={billing_details.contact_email}
                                        onChange={this.handleChange}
                                    />
                                    {/*Required*/}
                                    {submitted && !billing_details.contact_email && (
                                        <div className="help-block">Contact Email is required</div>
                                    )}
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
const connectedUserBillingUpdate = connect(mapStateToProps)(UserBillingUpdate);
export { connectedUserBillingUpdate as UserBillingUpdate }; 