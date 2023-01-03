import React from 'react';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';



import { userActions } from '../_actions';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false
        }

        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            this.state.userid = user._id;
            if (user.role == 1) {
                this.state.isAdmin = true;
            }
        }

        this.closeMenu = this.closeMenu.bind(this);
    }

    closeMenu() {
        const { dispatch } = this.props;
        dispatch({
            type: "isMenuOpen",
            data: false
        });
    }

    render() {
        let path = window.location.pathname;
        const { isAdmin } = this.state;
        const { isMenuOpen } = this.props;
        return (
            <div className={'sidebar' + (isMenuOpen ? " menuopen" : "")} data-color='green'>
                <div className='sidebar-wrapper'>
                    <ul className='nav'>
                        <li className={(path === '/' ? 'active' : '')}>
                            <Link className='nav-link' to='/'
                                onClick={() => {
                                    this.closeMenu();
                                }}>
                                <i className='pe-7s-graph'></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        {isAdmin &&
                            <li className={((path === '/userslist') ? 'active' : '')}>
                                <Link className='nav-link' to='/userslist'
                                    onClick={() => {
                                        this.closeMenu();
                                    }}>
                                    <i className='pe-7s-users'></i>
                                    <p>Resumes</p>
                                </Link>
                            </li>
                        }
                        {isAdmin &&
                            <li className={((path === '/resumelist') ? 'active' : '')}>
                                <Link className='nav-link' to='/userslist'
                                    onClick={() => {
                                        this.closeMenu();
                                    }}>
                                    <i className='pe-7s-users'></i>
                                    <p>Resumes</p>
                                </Link>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, misc } = state;
    const { user } = authentication;
    return {
        user,
        users,
        isMenuOpen: misc.isMenuOpen
    };
}

const connectedSidebar = connect(mapStateToProps)(Sidebar);
export { connectedSidebar as Sidebar };