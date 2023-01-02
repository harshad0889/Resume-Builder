import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reducerConstants, apiConstants, miscConstants, creditConstants } from '../_constants';
import { LoadingModal, LoadingImg } from '../_components';
import { userActions, usercreditActions, messageActions, miscActions } from '../_actions';
import { miscService } from '../_services';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    }
    this.getAllUsers = this.getAllUsers.bind(this);
 

    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.role == 1) {
        this.state.isAdmin = true;
      }
    }
  }

  getAllUsers() {
    const { dispatch } = this.props;
    let query = {
      role: 2,
      status: 1
    }
    dispatch(userActions.usersList(query));
  }


  componentWillMount() {
  
  }

  render() {
    
    return (
      <div className="col-md-12">
        <h2>Dashboard</h2>
        <div className="row">
         
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
 

  return {
    user,
    users,
   
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
