import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import userCrudReducer from '../api/userCrud'
import signUpReducer from '../features/Welcome/duck'
import groupSidebarReducer from '../features/GroupSidebar/duck'

const rootReducer = combineReducers({
    userCrud: userCrudReducer,
    signUp: signUpReducer,
    groupSidebar: groupSidebarReducer
})

const setUpStore = (preloadedState) => configureStore({
    reducer: rootReducer,
    preloadedState
})

export default setUpStore