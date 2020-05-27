import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import userCrudReducer from '../api/userCrud'
import signUpReducer from '../features/Welcome/duck'

const rootReducer = combineReducers({
    userCrud: userCrudReducer,
    signUp: signUpReducer
})


const store = configureStore({
    reducer: rootReducer
})

export default store