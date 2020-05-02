const mongoose = require('mongoose')
const Post = mongoose.model('Post')

module.exports = {
    find: (req, res) => {
        Post.find()
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    findOne: (req, res) => {
        Post.findOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    create: (req, res) => {
        Post.create(req.body)
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    updateOne: (req, res) => {
        Post.updateOne({_id: req.body._id},req.body,{new:true, runValidators:true})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    deleteOne: (req, res) => {
        Post.deleteOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },

}