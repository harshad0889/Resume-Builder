import React from 'react';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';

import { userActions } from '../_actions';

import queryString from 'query-string';


class EmailVerify extends React.Component {
    constructor(props) {
        super(props);

      //  this.handleSubmit = this.handleSubmit.bind(this);
        this.changeText = this.changeText.bind(this);
    }
    changeText(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value });
    };
    componentDidMount() {
      console.log(this.props)
       // const { requestStatus,data } = this.props;
   const { email, key,type } = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });

   console.log(email);
 const { dispatch } = this.props;
        if (email) {

            dispatch(userActions.emailverify({email,key},type));
        }


}


    render() {
        console.log(this.props)
       // const { requestStatus,data } = this.props;
   const { email, key } = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });

        return (
            <div className="col-md-6 col-md-offset-3">
            <h2>hiiii</h2>
            {key} { email}

                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />


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

const connectedEmailVerify = connect(mapStateToProps)(EmailVerify);
export { connectedEmailVerify as EmailVerify };