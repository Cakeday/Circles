const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
    
    text: {
        type: String,
    },

    poster: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    likes: {
        type: Number,
        required: true,
        default: 0
    },

    likers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }


}, {timestamps: true})

mongoose.model('Post', PostSchema)