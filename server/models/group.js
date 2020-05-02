const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
        title: {
            type: String,
            required: true
        },

        posts: [{
            type: Schema.Types.ObjectId,
            ref: "Post"
        }],
    }]




}, {timestamps: true})

mongoose.model('Group', GroupSchema)