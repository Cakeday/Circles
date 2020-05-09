const mongoose = require('mongoose')
const Channel = mongoose.model('Channel')

module.exports = {
    find: (req, res) => {
        Channel.find()
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    findOne: (req, res) => {
        Channel.findOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    create: async (req, res, next) => {
        try {
            if (!req.session.userId) return next(new Error('you need to log in first'))
            const currentUser = await User.findOne({_id: req.session.userId})
            if (!currentUser) return next(new Error('User doesnt exist'))
            const newChannel = await Channel.create(req.body)
            res.json({message: 'new channel created'}, newChannel)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    updateOne: (req, res) => {
        Channel.updateOne({_id: req.body._id},req.body,{new:true, runValidators:true})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    deleteOne: (req, res) => {
        Channel.deleteOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },


}