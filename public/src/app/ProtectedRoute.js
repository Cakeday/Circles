import React from 'react'

import { connect, useSelector } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";


const Protected = ({ path, component: Component }) => {
    const loggedIn = useSelector(state => state.session.loggedIn)
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

