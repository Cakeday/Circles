import axios from 'axios'
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getUserGroups = createAsyncThunk(
    'user/getUserGroups',
    async (arg, thunkAPI) => {
        const userGroups = await axios.get('/api/user/findAllGroupsWithUser')
        return userGroups
    }
)


const initialState = {
    groupsWithChannels: [],
    loading: 'idle',
    error: null
}


const GroupSidebarSlice = createSlice({
    name: 'GroupSidebarSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getUserGroups.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [getUserGroups.fulfilled]: (state, action) => {
            state.groupsWithChannels = action.payload.groups
            state.loading = 'idle'
        },
        [getUserGroups.rejected]: (state, action) => {
            state.error = action.error
            state.loading = 'idle'
        }
    }
})