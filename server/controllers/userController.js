const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const session = require('express-session')
const io = require('../socketio/socket')


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
            const userToCreate = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                hashedPassword: hash,
            })
            const newUser = await User.create(userToCreate);
            req.session.isLoggedIn = true;
            req.session.email = req.body.email;
            res.json(newUser)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    updateOne: (req, res) => {
        if (!req.session.userId) return next(new Error('you need to log in first'))
        User.updateOne({_id: req.body._id},req.body,{new:true, runValidators:true})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    deleteOne: (req, res) => {
        if (!req.session.userId) return next(new Error('you need to log in first'))
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
            req.session.userId = userInfo._id
            res.json(userInfo)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    logout: async (req, res) => {
        if (req.session.id) { 
            req.session.destroy();
            res.json({message: 'success'})
        }
        res.json({message: "user wasn't in session"})
    },

    requestFriend: async (req, res, next) => {
        try {
            // check if user in session && if both users exist
            if (!req.session.userId) return next(new Error('you need to log in first'))
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
            if (!req.session.userId) return next(new Error('you need to log in first'))
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
            if (!req.session.userId) return next(new Error('you need to log in first'))
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

    


}