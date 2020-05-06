const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChannelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],

    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
})

mongoose.model('Channel', ChannelSchema)