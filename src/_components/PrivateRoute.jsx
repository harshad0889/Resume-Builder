import React from 'react';
import { Link } from 'react-router-dom';
  
import { Route, Redirect } from 'react-router-dom';
//if( localStorage.getItem('user')){ alert(222)}

	

//localStorage.removeItem('user')


export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
