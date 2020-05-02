const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')

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
            res.json(newUser)
        } catch (error) {
            res.json(error)
            next(error)
        }
    },
    updateOne: (req, res) => {
        User.updateOne({_id: req.body._id},req.body,{new:true, runValidators:true})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },
    deleteOne: (req, res) => {
        User.deleteOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(error =>res.json(error))
    },

}