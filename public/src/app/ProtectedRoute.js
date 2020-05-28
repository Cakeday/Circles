import React from 'react'

import { useSelector } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";


const Protected = ({ path, component: Component }) => {
    const loggedIn = useSelector(state => state.signUp.isLoggedIn)
    return (
        <Route
            path={path}
            render={props => (
            loggedIn ?
            <Component {...props} /> :
            <Redirect to='/welcome' />
            )}
        />
    )
};

export const ProtectedRoute = withRouter(Protected);

