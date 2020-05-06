const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 1
    },
    
    lastName: {
        type: String,
        required: true,
        minLength: 1
    },

    hashedPassword: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    // You'll need to figure out how to deal with pictures stored in S3...
    // profileImage: {
    //     imageUrl: {
    //         type: String,
    //     },
    //     imageId: {
    //         type: Schema.Types.ObjectId
    //     }
    // }

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group",
        unReadMessages: Number
    }],

    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    notifications: [{ 
        kind: {
            type: String,
            enum: ['friendRequest', 'newChannelPost', 'newDirectMessage', 'messageLiked'],
        },
        category: {
            type: Schema.Types.ObjectId,
        },
    }]

}, {timestamps: true})

mongoose.model('User', UserSchema)