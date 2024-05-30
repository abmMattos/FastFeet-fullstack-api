const { Router } = require("express");

const deliverymanRoutes = require("./deliveryman.routes")
const adminRoutes = require("./admin.routes")
const userRoutes = require("./user.routes")
const packageRoutes = require("./package.routes")

const routes = Router()

routes.use('/deliveryman', deliverymanRoutes)
routes.use('/admin', adminRoutes)
routes.use('/user', userRoutes) 
routes.use('/package', packageRoutes) 

module.exports = routes