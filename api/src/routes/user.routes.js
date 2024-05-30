const { Router } = require("express");
const UserController = require("../controller/UserController");

const userController = new UserController()

const userRoutes = Router()

userRoutes.post('/register', userController.register)
userRoutes.get('/login', userController.login)
userRoutes.delete('/delete', userController.delete)
userRoutes.put('/update', userController.update)
userRoutes.get('/', userController.findMany)
userRoutes.put('/findManyPackage', userController.findManyPackage)

module.exports = userRoutes