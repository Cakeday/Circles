const mongoose = require('mongoose')

const User = mongoose.model('User')
const Group = mongoose.model('Group')
const Channel = mongoose.model('Channel')
const Post = mongoose.model('Post')

const bcrypt = require('bcrypt')
const io = require('../socketio/socket')

const sessionizeUser = require('../session/util').sessionizeUser


module.exports = {
    find: (req, res) => {
        User.find()
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    findOne: (req, res) => {
        User.findOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    create: async (req, res, next) => {
        try {
            if (!req.body.password || req.body.password !== req.body.passwordConf) return next(new Error('Passwords don\'t match or weren\'t provided'))
            let userExist = await User.findOne({email: req.body.email})
            if (userExist) return next(new Error('User with that email already exists'))
            const hash = await bcrypt.hash(req.body.password, 10);
            const globalGroup = await Group.findOne({_id: '5ecf0b323eb4d4d62f0e7bed'})
            const userToCreate = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                hashedPassword: hash,
                groups: [globalGroup._id]
            })
            const newUser = await User.create(userToCreate);
            globalGroup.members.push(newUser._id)
            globalGroup.save()
            req.session.user = sessionizeUser(newUser)
            res.json(newUser)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    updateOne: (req, res) => {
        if (!req.session.user) return next(new Error('you need to log in first'))
        User.updateOne({_id: req.body._id},req.body,{new:true, runValidators:true})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    deleteOne: (req, res, next) => {
        if (!req.session.user) return next(new Error('you need to log in first'))
        User.deleteOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },

    login: async (req, res, next) => {
        try {
            let userInfo = await User.findOne({email: req.body.email})
            if (!userInfo) return next(new Error('That email doesn\'t exist in the database'))
            let match = await bcrypt.compare(req.body.password, userInfo.hashedPassword)
            if (!match) return next(new Error('incorrect password'))
            req.session.user = sessionizeUser(userInfo)
            if (!userInfo.groups.includes('5ecf0b323eb4d4d62f0e7bed')) {
                const globalGroup = await Group.findOne({_id: '5ecf0b323eb4d4d62f0e7bed'})
                globalGroup.members.push(userInfo._id)
                await globalGroup.save()
                userInfo.groups.push(globalGroup._id)
                await userInfo.save()
            }
            res.json(userInfo)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    logout: (req, res) => {
        if (req.session.user) { 
            req.session.destroy();
            res.json({message: 'success'})
        } else {
            res.json({message: "user wasn't in session"})
        }
    },
    checkSession: (req, res) => {
        res.json(req.session.user)
    },

    requestFriend: async (req, res, next) => {
        try {
            // check if user in session && if both users exist
            if (!req.session.user) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.body.userId})
            const userToRequest = await User.findOne({_id: req.body.friendId})
            if (!currentUser || !userToRequest) return next(new Error('User doesnt exist'))
    
    
            // check for pending requests on both sides && if already friends
            if (currentUser.friendRequests.includes(userToRequest._id)) {
                return next(new Error('You already have a pending request from this user.'))
            }
            if (userToRequest.friendRequests.includes(currentUser._id)) {
                return next(new Error('You already sent a request to this person.'))
            }
            if (currentUser.friends.includes(userToRequest._id)) {
                return next(new Error("You're already friends with this person"))
            }
    
            const notification = {
                kind: 'friendRequest',
                category: currentUser._id
            }
    
            userToRequest.friendRequests.push(currentUser._id)
            userToRequest.notifications.push(notification)
            await userToRequest.save()
    
            // need to figure this out...
            // io.getIO().emit('friendRequest')
    
            res.json({message: 'Successfully sent request'})
            
        } catch (error) {
            res.json(error)
            next(error)
        }


    },

    acceptFriend: async (req, res, next) => {
        try {
            // check if user in session && if both users exist
            if (!req.session.user) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.body.userId})
            const userToAccept = await User.findOne({_id: req.body.friendId})
            if (!currentUser || !userToAccept) return next(new Error("User doesn't exist"))

            // look for the frend request, add the friend, remove friend request and notification
            if (currentUser.friendRequests.includes(userToAccept._id)) {
                currentUser.friends.push(userToAccept._id)
                const indexOfReq = currentUser.friendRequests.indexOf(userToAccept._id)
                const indexOfNotification = currentUser.notifications.map(el => el.category).indexOf(userToAccept._id)
                currentUser.friendRequests.splice(indexOfReq, 1)
                currentUser.notifications.splice(indexOfNotification, 1)
                await currentUser.save()
                res.json({message: 'successfully added friend', currentUser})
            } else {
                return next(new Error("the friend request doesn't exist"))
            }

        } catch (error) {
            res.json(error)
            next(error)
        }
    },

    rejectFriend: async (req, res, next) => {
        try {
            // check if user in session && if both users exist
            if (!req.session.user) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.body.userId})
            const userToAccept = await User.findOne({_id: req.body.friendId})
            if (!currentUser || !userToAccept) return next(new Error("User doesn't exist"))

            // look for the frend request, remove it and notification
            if (currentUser.friendRequests.includes(userToAccept._id)) {
                const indexOfReq = currentUser.friendRequests.indexOf(userToAccept._id)
                const indexOfNotification = currentUser.notifications.map(el => el.category).indexOf(userToAccept._id)
                currentUser.friendRequests.splice(indexOfReq, 1)
                currentUser.notifications.splice(indexOfNotification, 1)
                await currentUser.save()
                res.json({message: 'successfully removed friendrequest', currentUser})
            } else {
                return next(new Error("the friend request doesn't exist"))
            }

        } catch (error) {
            res.json(error)
            next(error)
        }
    },

    joinGroup: async (req, res, next) => {
        try {
            // validate user and group
            if (!req.session.user) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.body.userId})
            if (!currentUser) return next(new Error("User doesn't exist"))
            const groupToJoin = await Group.findOne({_id: req.body.groupId})
            if (!groupToJoin) return next(new Error('That group does not exist'))

            // check to see if user in group on both sides
            if (currentUser.groups.includes(groupToJoin._id)) return next(new Error("You're already in this group"))
            if (groupToJoin.members.includes(currentUser._id)) return next(new Error("You're already in this group"))

            // push user into group members, and push group into user's groups
            groupToJoin.members.push(currentUser._id)
            const groupJoined = await groupToJoin.save()
            currentUser.groups.push(groupToJoin._id)
            const userJoined = await currentUser.save()

            res.json({message: "Successfully joined group"}, groupJoined, userJoined)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },


    leaveGroup: async (req, res, next) => {
        try {
            // validate user and group
            if (!req.session.user) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.body.userId})
            if (!currentUser) return next(new Error("User doesn't exist"))
            const groupToLeave = await Group.findOne({_id: req.body.groupId})
            if (!groupToJoin) return next(new Error('That group does not exist'))

            // check to see if user NOT in group on both sides
            if (!currentUser.groups.includes(groupToJoin._id)) return next(new Error("You're not in this group"))
            if (!groupToJoin.members.includes(currentUser._id)) return next(new Error("You're not in this group"))

            // remove user and group on both sides
            const indexOfUserInGroup = groupToLeave.members.indexOf(currentUser._id)
            const indexOfGroupInUser = currentUser.groups.indexOf(groupToLeave._id)
            groupToLeave.members.splice(indexOfUserInGroup, 1)
            currentUser.groups.splice(indexOfGroupInUser, 1)
            const groupLeft = await groupToLeave.save()
            const userLeft = await currentUser.save()

            res.json({message: "Successfully joined group"}, groupLeft, userLeft)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },

    postToChannel: async (req, res, next) => {
        try {
            if (!req.session.user) return next(new Error('you need to log in first'))
            const channel = await Channel.findOne({_id: req.body.channelId})
            if (!channel) return next(new Error("that channel doesn't exist"))
            const post = {
                text: req.body.text,
                poster: req.body.userId,
                likes: 0,
                likers: [],
                channel: req.body.channelId
            }
            const newPost = await Post.create(post)
            res.json(newPost)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    
    findAllGroupsWithUser: async (req, res, next) => {
        try {
            console.log(req.session)
            if (!req.session.user) return next(new Error('you need to log in first'))
            const userGroups = await User.findOne({_id: req.session.user.userId}).populate({path: 'groups', populate: {path: 'channels'}})
            res.json(userGroups)
        } catch (error) {
            res.json(error)
            next(error)
        }
    }






}