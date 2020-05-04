const userController = require('../controllers/userController')





module.exports = (app) => {
    app.get('/api/user/findAll', userController.find)
    app.get('/api/user/findOne/:id', userController.findOne)
    app.post('/api/user/create', userController.create)
    app.put('/api/user/updateOne', userController.updateOne)
    app.delete('/api/user/deleteOne/:id', userController.deleteOne)

    app.post('/api/user/login', userController.login)
    app.get('/api/user/logout', userController.logout)


    
    // app.all("*", (req,res,next) => {
    //     res.sendFile(path.resolve("./public/dist/public/index.html"))
    // });
}
