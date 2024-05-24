const { Router } = require("express");

const deliverymanRoutes = require("./deliveryman.routes")
const adminRoutes = require("./admin.routes")

const routes = Router()

routes.use('/deliveryman', deliverymanRoutes)
routes.use('/admin', adminRoutes)

module.exports = routes