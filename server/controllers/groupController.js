const mongoose = require('mongoose')
const Group = mongoose.model('Group')
const Channel = mongoose.model('Channel')
const User = mongoose.model('User')

module.exports = {
    find: (req, res) => {
        Group.find()
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    findOne: (req, res) => {
        Group.findOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    create: async (req, res, next) => {
        try {
            if (!req.session.userId) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.session.userId})
            if (!currentUser) return next(new Error('User doesnt exist'))
            if (!req.body.creator) req.body.creator = req.session.userId
            if (!req.body.members) req.body.members = [req.session.userId]
            const newGroup = await Group.create(req.body)
            const defaultChannel = {
                title: 'Main Channel',
                description: "This is the default channel that's created whenever you create a new group. It is public by default. Say Hello! :)",
                privacy: "open",
                group: newGroup._id,
                members: [req.session.userId]
            }
            const defaultChannelResponse = await Channel.create(defaultChannel)
            newGroup.channels.push(defaultChannelResponse._id)
            const groupWithDefaultChannel = await newGroup.save()
            res.json(groupWithDefaultChannel)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    updateOne: (req, res) => {
        Group.updateOne({_id: req.body._id},req.body,{new:true, runValidators:true})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    deleteOne: (req, res) => {
        Group.deleteOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },


}