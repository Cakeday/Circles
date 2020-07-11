const userController = require('../controllers/userController')
const groupController = require('../controllers/groupController')
const channelController = require('../controllers/channelController')




module.exports = (app) => {
    app.get('/api/user/findAll', userController.find)
    app.get('/api/user/findOne/:id', userController.findOne)
    app.post('/api/user/create', userController.create)
    app.put('/api/user/updateOne', userController.updateOne)
    app.delete('/api/user/deleteOne/:id', userController.deleteOne)

    app.post('/api/user/login', userController.login)
    app.get('/api/user/logout', userController.logout)
    app.get('/api/user/checkSession', userController.checkSession)

    app.post('/api/user/requestFriend', userController.requestFriend)
    app.post('/api/user/acceptFriend', userController.acceptFriend)
    app.post('/api/user/rejectFriend', userController.rejectFriend)
    
    app.get('/api/group/findAll', groupController.find)
    app.post('/api/group/createGroup', groupController.create)
    app.get('/api/group/deleteOne/:id', groupController.deleteOne)
    
    app.post('/api/user/joinGroup', userController.joinGroup)
    app.post('/api/user/leaveGroup', userController.leaveGroup)
    app.get('/api/user/findAllGroupsWithUser', userController.findAllGroupsWithUser)
    
    app.post('/api/user/createChannel', channelController.create)
    app.post('/api/user/postToChannel', userController.postToChannel)
    // app.post('/api/user/likePost', userController.likePost)

    // app.post('/api/user/sendDirectMessage', userController.sendDirectMessage)
    // app.post('/api/user/likeDirectMessage', userController.likeDirectMessage)

    


    
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("../../public/public/index.html"))
    });
}

