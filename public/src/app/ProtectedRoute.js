import React, { useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";
import { checkIfLoggedIn } from "../features/Welcome/duck";


const Protected = ({ path, component: Component }) => {
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.signUp.isLoggedIn)
    useEffect(() => {
        dispatch(checkIfLoggedIn())
    })
    return (
        <Route
            path={path}
            render={props => (
            loggedIn ?
            <Component {...props} /> :
            <Redirect to='/' />
            )}
        />
    )
};

export const ProtectedRoute = withRouter(Protected);

