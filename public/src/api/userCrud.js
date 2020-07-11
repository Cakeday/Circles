import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'




export const findAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (arg, thunkAPI) => {
        const response = await axios.get('/api/user/findAll')
        return response.data
    }
)

export const findUserById = createAsyncThunk(
    'users/fetchUserById',
    async (arg, thunkAPI) => {
        const response = await axios.get('/api/user/findAll')
        return response.data
    }
)


const initialState = {
    loading: 'idle',
    error: null,
    allUsers: [],
}

const userCrudSlice = createSlice({
    name: 'userCrud',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [findAllUsers.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [findAllUsers.fulfilled]: (state, action) => {
            state.allUsers = action.payload
            state.loading = 'idle'
        },
        [findAllUsers.rejected]: (state, action) => {
            state.loading = 'idle'
            state.error = action.error
        },


    }
    
})

// export const {  } = signUpSlice.actions

export default userCrudSlice.reducer



 