const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    description: {
        type: String,
        required: true,
        default: ''
    },

    // picture: {

    // }

    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }]




}, {timestamps: true})

mongoose.model('Group', GroupSchema)