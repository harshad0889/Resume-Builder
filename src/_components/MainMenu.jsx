import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { reducerConstants } from '../_constants';

import { alertActions, userActions } from "../_actions";

import { createBrowserHistory } from "history";
export default createBrowserHistory();
// const historyNew = createHistory();



class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarshow: true,
      height: window.innerHeight + "px",
    };

    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/forgotPassword" ||
      window.location.pathname === "/emailverify" ||
      !localStorage.getItem("user")
    ) {
      this.state = {
        isSidebarshow: false,
      };
      // this.Panelstyle = { width: '100%' }
    }
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  openMenu() {
    const { dispatch, isMenuOpen } = this.props;
    dispatch({
      type: "isMenuOpen",
      data: !isMenuOpen
    });
  }

  closeMenu() {
    const { dispatch } = this.props;
    dispatch({
      type: "isMenuOpen",
      data: false
    });
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  // componentDidMount() {

  // }
  componentDidMount() { }

  render() {
    // const { alert } = this.props;
    let path = window.location.pathname;



    return (
      <nav className="navbar navbar-expand-sm" >

        <a className="navbar-menu">
          <div className="logo-box"
            onClick={() => {
              this.openMenu();
            }}>
            <i className="fas fa-bars"></i>
          </div>
        </a>
        <div className="navbar-brand">
          <div className="logo-box">
            {/* <img src="/dist/assets/img/logo.png" /> */}
            <p className="shopchat_mainmenu_logo">BUILD YOUR RESUME</p>
          </div>
        </div>
        <ul className="navbar-nav flex-right">
          <li className="nav-item"> </li>

          <li
            className={
              "nav-item dropdown  menu-ddown " +
              (!!this.state.isOpenProfile ? "show" : "") 
            }
            // onMouseEnter={() => {
            //   this.setState({ isOpenProfile: true });
            // }}
            onClick={() => {
              this.setState({ isOpenProfile: !this.state.isOpenProfile });
              this.closeMenu();
            }}
            onMouseLeave={() => {
              this.setState({ isOpenProfile: false });
            }}
          >
            <div className="nav-link dropdown-toggle">
              <i className="fa fa-user"></i>
            </div>
            <div
              className={
                "dropdown-menu dropdown-menu-right menu-ddown-content " +
                (!!this.state.isOpenProfile ? "show" : "")
              }
            >
              <Link className="dropdown-item" to="/profile">
                <i className="fa fa-user"></i> Profile
              </Link>
              {/* <Link className="dropdown-item" to="/profile">
                <i className="fa fa-random"></i> Change password
              </Link>

              <Link className="dropdown-item" to="#">
                <i className="fa fa-info-circle"></i> Help Center
              </Link> */}

              {/* <div className="divider"></div> */}

              <Link
                to="#"
                className="dropdown-item text-danger"
                onClick={() => {
                  this.logout();
                }}
              >
                <i className="fa fa-power-off"></i> Log out
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { alert, misc } = state;
  return {
    alert,
    isMenuOpen: misc.isMenuOpen
  };
}

const connectedMainMenu = connect(mapStateToProps)(MainMenu);
export { connectedMainMenu as MainMenu };
