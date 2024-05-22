const { Router } = require('express')

const DeliverymanController = require("../controller/DeliverymanController")

const deliverymanRoutes = Router()

const deliverymanController = new DeliverymanController()

deliverymanRoutes.post('/register', deliverymanController.register)

module.exports = deliverymanRoutes