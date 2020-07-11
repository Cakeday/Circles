import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUserGroups = createAsyncThunk(
    'user/getUserGroups',
    async (arg, thunkAPI) => {
        const response = await axios.get('/api/user/findAllGroupsWithUser')
        return response.data
    }
)

export const sendMessage = createAsyncThunk(
    'post/sendMessage',
    async (arg, thunkAPI) => {
        const response = await axios.post('/api/user/postToChannel')
        return response.data
    }
)


const initialState = {
    groupsWithChannels: [],
    channelsOfGroup: [],
    messagesOfChannel: [],
    activeGroup: null,
    activeChannel: null,
    loading: 'idle',
    error: null

}


const GroupSidebarSlice = createSlice({
    name: 'GroupSidebarSlice',
    initialState: initialState,
    reducers: {
        setActiveGroup: (state, action) => {
            if (action.payload.group) {
                const { group } = action.payload
                state.activeGroup = group._id
                state.activeChannel = group.channels[0]._id
                state.channelsOfGroup = group.channels
                state.messagesOfChannel = group.channels[0].posts
            }
        },
        setActiveChannel: (state, action) => {
            if (action.payload.channel) {
                const { channel } = action.payload
                state.activeChannel = channel._id
                state.messagesOfChannel = channel.posts
            }
        }
    },
    extraReducers: {
        [getUserGroups.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [getUserGroups.fulfilled]: (state, action) => {
            const { groups } = action.payload
            state.groupsWithChannels = groups
            state.activeGroup = groups[0]._id
            state.activeChannel = groups[0].channels[0]._id
            state.channelsOfGroup = groups[0].channels
            state.messagesOfChannel = groups[0].channels[0].posts
            state.loading = 'idle'
        },
        [getUserGroups.rejected]: (state, action) => {
            state.error = action.error
            state.loading = 'idle'
        },



        [sendMessage.pending]: (state, action) => {
            state.loading = 'pending'
        },
        [sendMessage.fulfilled]: (state, action) => {
            state.newMessage = action.payload
            state.loading = 'idle'
        },
        [sendMessage.rejected]: (state, action) => {
            state.loading = 'idle'
            state.error = action.error
        },
    }
})

export const { setActiveGroup, setActiveChannel } = GroupSidebarSlice.actions

export default GroupSidebarSlice.reducer