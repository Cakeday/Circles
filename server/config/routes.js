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

    app.post('/api/user/requestFriend', userController.requestFriend)
    app.post('/api/user/acceptFriend', userController.acceptFriend)
    app.post('/api/user/rejectFriend', userController.rejectFriend)
    
    app.post('/api/user/createGroup', groupController.create)
    app.post('/api/user/joinGroup', userController.joinGroup)
    app.post('/api/user/leaveGroup', userController.leaveGroup)
    
    
    app.post('/api/user/createChannel', channelController.create)
    // app.post('/api/user/postToGroup', userController.postToGroup)
    // app.post('/api/user/likePost', userController.likePost)

    // app.post('/api/user/sendDirectMessage', userController.sendDirectMessage)
    // app.post('/api/user/likeDirectMessage', userController.likeDirectMessage)

    


    
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/public/index.html"))
    });
}
