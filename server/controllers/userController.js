const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const session = require('express-session')


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
    logout: async (req, res, next) => {
        if (req.session.id) req.session.destroy();
        res.json({message: 'success'})
    }

}