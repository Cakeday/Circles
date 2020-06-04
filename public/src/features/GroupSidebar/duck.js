import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUserGroups = createAsyncThunk(
    'user/getUserGroups',
    async (arg, thunkAPI) => {
        const response = await axios.get('/api/user/findAllGroupsWithUser')
        return response.data
    }
)


const initialState = {
    groupsWithChannels: [],
    channelsOfGroup: [],
    loading: 'idle',
    error: null

}


const GroupSidebarSlice = createSlice({
    name: 'GroupSidebarSlice',
    initialState: initialState,
    reducers: {
        getChannelsOfGroup: (state, action) => {
            if (action.payload.channels) {
                state.channelsOfGroup = action.payload.channels
            }
        }
    },
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

export const { getChannelsOfGroup } = GroupSidebarSlice.actions

export default GroupSidebarSlice.reducer