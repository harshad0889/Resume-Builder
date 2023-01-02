import React from 'react';
import { connect } from 'react-redux';
import { LoadingImg } from '../_components';
import { userActions } from '../_actions';
import { reducerConstants } from '../_constants';
import { history } from '../_helpers';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteConfirmation:false,
            isAdmin: false,
            openFilter: false,
            query: {
                pageVo: {
                    pageNo: 1,
                    noOfItems: 4
                },
                role: 2,
                status:1
            }
        };
        this.getAllUsers = this.getAllUsers.bind(this);
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.role == 1) {
                this.state.isAdmin = true;
            }
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.deleteconfirmation = this.deleteconfirmation.bind(this);
        this.deleteconfirmationClose = this.deleteconfirmationClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    selectList(data) {
        if (typeof this.props.selectList === 'function') {
            this.props.selectList(data);
        }
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
            this.getAllUsers(1);
        } else {
            history.push('/');
        }
    }
    // ***********delete User part*********
    //status update 0
  deleteconfirmation(object){
    this.setState({
      showDeleteConfirmation:true,
      user:object
    })
  }
  deleteconfirmationClose(){
    this.setState({
      showDeleteConfirmation:false
    })
  }
  deleteUser(userObject){
    const _this=this
    const { dispatch } = this.props;
    console.log(userObject)
    userObject.status=0;
    dispatch(userActions.saveUser(userObject)).then(
      function(res) {
          console.log(res);

          if (res) {
            _this.setState({
                  showDeleteConfirmation:false
                })    
                _this.getAllUsers(1);     
               }
      });;
  }
   //return serach result
   handleChange(e) { 
    const _this = this;
    this.setState(
      {
        [e.target.name]: e.target.value,
        query: {
          ...this.state.query,
          [e.target.name]: e.target.value,
        },
      },
      function () {
        _this.getAllUsers(1);
      }
    );
  }

    render() {
        const paginationItems = [];
        const userRows = [];

        if (this.props.userData && this.props.userData.pages > 1) {
            let start = 1;
            let end = this.props.userData.pages;
            const currentPageNo = this.props.userData.page;
            const totalPages = this.props.userData.pages;
            if (totalPages > 5) {
                if (currentPageNo + 4 > totalPages) {
                    start = totalPages - 4;
                    end = totalPages;
                } else {
                    if (currentPageNo == end) {
                        start = currentPageNo;
                        end = parseInt(currentPageNo) + 4;
                    } else if (currentPageNo == 1) {
                        start = currentPageNo;
                        end = start + 4;

                    } else if (currentPageNo == start) {
                        end = currentPageNo;
                        start = currentPageNo - 4;
                        if ((currentPageNo - 4) <= 0) {
                            start = 1;
                            end = 5;
                        }
                    } else if (currentPageNo < start) {
                        end = start;
                        start = end - 4;
                    } else if (!end && !start) {
                        start = 1;
                        end = 5;
                    }
                }
            }

            paginationItems.push(<li className='page-item ' key={0}> <a className="page-link" onClick={currentPageNo > 1 ? this.getAllUsers.bind(this, currentPageNo - 1) : undefined}> Prev </a> </li>)
            for (
                let i = start;
                i <= end;
                i = i + 1
            ) {
                paginationItems.push(
                    <li
                        className={
                            'page-item ' +
                            (currentPageNo === i ? 'active ' : 'noactive')
                        }
                        key={i}>
                        <a className="page-link" onClick={this.getAllUsers.bind(this, i)}>
                            {i}
                        </a>
                    </li>
                );
            }
            paginationItems.push(<li className='page-item ' key={totalPages + 1}> <a className="page-link" onClick={totalPages > currentPageNo ? this.getAllUsers.bind(this, currentPageNo + 1) : undefined}>Next </a> </li>)
        }
        for (let j = 0; this.props.userData && this.props.userData.docs && j < this.props.userData.docs.length; j = j + 1) {
            userRows.push(
                <tr className={'' + (this.props.activeId === this.props.userData.docs[j]._id ? 'active ' : 'noactive')} key={j} onClick={this.selectList.bind(this, this.props.userData.docs[j])}>
                    {/* <td>{this.props.userData.docs[j]._id} </td> */}
                    <td>
                        {/* {this.props.userData.docs[j].image ? (
                            <img className="listImage" src={
                                this.props.userData.docs[j].image
                            } />

                        ) : (
                                <i className="fa fa-user" />
                            )} */}

                            {j+1}
                    </td>
                    <td>{this.props.userData.docs[j].name} </td>
                    <td>{this.props.userData.docs[j].email} </td>
                    <td>{this.props.userData.docs[j].phone} </td>
                    <td className="eventCell  eventView">
                        <a href={'/user/' + this.props.userData.docs[j]._id}>
                            View
                        </a>
                    </td>
                    <td className="eventCell  event Edit">
                        <a href={'/useradd/' + this.props.userData.docs[j]._id}>
                            Edit
                        </a>
                    </td>
                    <td className="eventCell  event Edit">
            <a  onClick={()=>{this.deleteconfirmation(this.props.userData.docs[j])}}> 
            {/* <i className="fa fa-trash" aria-hidden="true"></i> */}
            Delete
            </a> 
          </td>
                </tr>
            );
        }

        return (
            <div className="UserList">
                <div className="col-md-12">
                    <div className="card regular-table-with-color">
                        <div className="card-header page-header ">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4> User List</h4>
                                </div>
                                <div className="col-md-4">
                                    <a
                                        className="btn btn-primary float-right"
                                        href="/useradd/0">
                                        <i className="fas fa-user-plus" />
                                        <span> Add User</span>
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <p >
                                                        <input
                                        className="search_input_bar"
                                        value={this.state.searchKey}
                                        onChange={this.handleChange}
                                        type="text"
                                        name="searchKey"
                                        aria-label="Search"
                                        placeholder="Search for a course"
                                />
                                <a className="search_bar"><i class="fa fa-search in_bar" aria-hidden="true"></i></a>
                                 </p>
                                </div>
                                <div className="col-md-4">
                                    
                                </div>
                            </div>
                          
                        </div>
                        <div className="card-body  table-responsive main-card-body ">
                            {this.props.requestStatus !==
                                reducerConstants.USERLIST_REQUEST && (
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                {/* <th>User ID</th> */}
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                {/* <th>Company</th> */}
                                                <th>Phone</th>
                                                <th className="eventCell  eventView" />
                                                <th className="eventCell  eventEdit" />
                                                <th className="eventCell  eventDelete" />
                                            </tr>
                                        </thead>

                                        <tbody>{userRows}</tbody>
                                    </table>
                                )}
                            {this.props.requestStatus ===
                                reducerConstants.USERLIST_REQUEST && <LoadingImg />}
                            {this.props.requestStatus ===
                                reducerConstants.USERLIST_SUCCESS
                                && this.props.userData
                                && this.props.userData.docs
                                && this.props.userData.docs.length === 0 && <p className="margin-top-20 text-center"> No result found </p>}
                        </div>
                        <div className="card-footer">
                            <ul className="pagination">{paginationItems}</ul>
                        </div>
                    </div>
                </div>
                { this.state.showDeleteConfirmation&&
          <div className="modal " style={{ display: 'block', background: ' rgb(10 11 11 / 50%)'}}>
            <div className="modal-dialog">
            
            
              <div className="modal-content">
                {/* <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"  onClick={this.deleteconfirmationClose}>&times;</button>
                  <p className="modal-title">DELETE</p>
                </div> */}
                <div className="modal-body">
                    <div className="bag">
                    <div className="row">
                        <div className="col-md-4">
                        <img className="delete_popup_img" src="/dist/assets/img/delete.png" /> 
                        </div>
                        <div className="col-md-8">
                        <p className="delete_string">Are you sure do you want to delete this User...?</p>
                  <button className="button_delete" onClick={this.deleteconfirmationClose} >Close</button>
                  <button  className="button_delete_close" onClick={()=>{this.deleteUser(this.state.user)}}>Delete</button>
                        </div>

                    </div>
                    </div>
                 
               
               
              
                </div>
                 
              </div>
              
            </div>
          </div>
        }
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

const connectedUserList = connect(mapStateToProps)(UsersList);
export { connectedUserList as UsersList };