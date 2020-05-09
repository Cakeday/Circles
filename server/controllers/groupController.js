const mongoose = require('mongoose')
const Group = mongoose.model('Group')

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
            const currentUser = await User.findOne({_id: req.body.userId})
            if (!currentUser) return next(new Error('User doesnt exist'))
            const newGroup = await Group.create(req.body)
            res.json({message: 'new group created'}, newGroup)
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