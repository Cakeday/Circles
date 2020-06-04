import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const signUp = createAsyncThunk(
    'session/signUp',
    async (newUser, thunkAPI) => {
        const response = await axios.post('/api/user/create', newUser)
        return response.data
    }
)

export const login = createAsyncThunk(
    'session/login',
    async (user, thunkAPI) => {
        const response = await axios.post('/api/user/login', user)
        return response.data
    }
)

export const checkIfLoggedIn = createAsyncThunk(
    'session/checkIfLoggedIn',
    async (user, thunkAPI) => {
        const response = await axios.get('/api/user/checkSession')
        return response.data
    }
)


const initialState = {
    loading: 'idle',
    error: null,
    id: null,
    email: null,
    isLoggedIn: false
}

const signUpSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [signUp.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [signUp.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.id = action.payload._id
            state.email = action.payload.email
            state.loading = 'idle'
        },
        [signUp.rejected]: (state, action) => {
            state.error = action.error
            state.loading = 'idle'
        },

        [login.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.id = action.payload._id
            state.email = action.payload.email
            state.loading = 'idle'
        },
        [login.rejected]: (state, action) => {
            state.error = action.error
            state.loading = 'idle'
        }, 

        [checkIfLoggedIn.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [checkIfLoggedIn.fulfilled]: (state, action) => {
            if (action.payload.user) {
                state.isLoggedIn = true
                state.id = action.payload.user._id
                state.email = action.payload.user.email
                state.loading = 'idle'
            }
        },
        [checkIfLoggedIn.rejected]: (state, action) => {
            state.error = action.error
            state.loading = 'idle'
        }, 

    }
    
})

// export const { } = signUpSlice.actions

export default signUpSlice.reducer



 