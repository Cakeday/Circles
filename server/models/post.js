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

    likes: [{
        type: Schema.Types.ObjectId,
        default: 0,
    }]


}, {timestamps: true})

mongoose.model('Post', PostSchema)