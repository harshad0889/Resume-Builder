import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import { connect } from 'react-redux';
// import {testActions}  from '../_actions';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            openFilter: false,
            user: {
                name: '',
                company_name: '',
                email: '',
                phone: '',
                password: '',
                image: '',
                billing_details: {}
            },
            query: {
                pageVo: {
                    pageNo: 1,
                    noOfItems: 2
                }
            }
        };

        let user;
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
            if (user.role == 1) {
                this.state.isAdmin = true;
            }
        }
        this.state.query._id = user._id;
        this.getAllUsers(1);
        this.getAllUsers = this.getAllUsers.bind(this);
    }
    getAllUsers(pageNo) {
        this.state.query.pageVo.pageNo = pageNo;
        // this.setState({ query: this.state.query });
        const { dispatch } = this.props;
        dispatch(userActions.usersList(this.state.query));
    }


    render() {
        let { user, isAdmin } = this.state;

        if (this.props.userData && this.props.userData.docs) {
            // this.setState({ user: this.props.userData.docs[0] });
            user = this.props.userData.docs[0];
        }
        return (
            <div className="Profile" >
                <div className=" emp-profile">
                    {user && <form method="post">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="profile-head">
                                    {user.image && <img className="profileImg" src={user.image} />}
                                    <h6>
                                        {user.name}
                                    </h6>
                                    <h4>
                                        {user.email}
                                    </h4>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <Link to="/ProfileUpdate" className="btn btn-primary" >Edit profile</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Company Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.company_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Mobile Number</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.phone}</p>
                                            </div>
                                        </div>
                                        {!isAdmin &&
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Billing Details</label>
                                                </div>
                                                <div className='col-md-6'>
                                                    {user.billing_details &&
                                                        <div className="padding-10 materialshadow">
                                                            GSTN: <p>{user.billing_details.gstn}</p>
                                                            Business Name: <p>{user.billing_details.business_name}</p>
                                                            Address: <p>{user.billing_details.business_address}</p>
                                                            <p>{user.billing_details.city}</p>
                                                            <p>{user.billing_details.state}</p>
                                                            <p>{user.billing_details.country}</p>
                                                            <p>{user.billing_details.pincode}</p>
                                                            Contact Person: <p>{user.billing_details.contact_person}</p>
                                                            Contact Number: <p>{user.billing_details.contact_number}</p>
                                                            Contact Email: <p>{user.billing_details.contact_email}</p>
                                                        </div>
                                                    }

                                                    <a className="btn btn-primary btn-block" href={'/userbillingupdate'}>
                                                        Edit Billing details
                                                    </a>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // const { results } = state.test

    const { requestStatus, userData } = state.users;
    return {
        requestStatus,
        userData
    };
}


const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };
