

import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { reducerConstants } from '../_constants';
import { LoadingModal } from '../_components';
import { history } from '../_helpers';

class User extends React.Component {
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
        profile_url: ''
      },
      query: {
        pageVo: {
          pageNo: 1,
          noOfItems: 2
        }
      }
    };

    let role;
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      role = user.role;
      if (role == 1) {
        this.state.isAdmin = true;
      }
    }


    if (role == 1 &&
      this.props.match.params.id &&
      this.props.match.params.id !== 0 &&
      this.props.match.params.id !== '0'
    ) {
      this.state.query._id = this.props.match.params.id;
      this.getAllUsers(1);
    }
    this.getAllUsers = this.getAllUsers.bind(this);
  }
  getAllUsers(pageNo) {
    this.state.query.pageVo.pageNo = pageNo;
    this.setState({ query: this.state.query });
    const { dispatch } = this.props;
    dispatch(userActions.usersList(this.state.query));
  }
  componentWillMount() {
    if (this.state.isAdmin) {
      this.setState({ height: window.innerHeight + 'px' });
    } else {
      history.push('/');
    }
  }

  render() {
    let { user } = this.state;

    if (this.props.userData && this.props.userData.docs) {
      // this.setState({ user: this.props.userData.docs[0] });
      user = this.props.userData.docs[0];
    }
    console.log(user);
    return (
      <div className="User">
        {this.props.requestStatus ===
          reducerConstants.USERLIST_REQUEST && <LoadingModal />}
        <div className="col-md-12">
          <div className="card regular-table-with-color">
            <div className="card-header page-header ">
            
              <div className="row">
                                <div className="col-md-8">
                                <h4 className="card-title">User view</h4>
                                </div>
                                <div className="col-md-4">
                                <a className="btn btn-primary float-right" href={'/useradd/' + user._id}>
                                      Edit
                                    </a>
                                </div>
                            </div>
            </div>
            <div className="card-body">
              {user.image && <img className="profileImg" src={user.image} />}
              <div className="row">
                <div className="col-md-4">
                {user.name &&<p className="single_view_user"><i class="fa fa-user" aria-hidden="true"></i>{user.name}</p>}
                 
                </div>
                <div className="col-md-4">
                {user.email&&<p className="single_view_user"><i class="fa fa-envelope" aria-hidden="true"></i>{user.email}</p>}
                </div>
                <div className="col-md-4">
                {user.phone&& <p className="single_view_user"><i class="fa fa-phone" aria-hidden="true"></i>{user.phone}</p>}
                </div>
              </div>
            </div>
            <div className="card-footer">
            
            </div>
          </div>
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

const connectedUser = connect(mapStateToProps)(User);
export { connectedUser as User };


