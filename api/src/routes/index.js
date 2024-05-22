const { Router } = require("express");

const deliverymanRoutes = require("./deliveryman.routes")

const routes = Router()

routes.use('/deliveryman', deliverymanRoutes)

module.exports = routes