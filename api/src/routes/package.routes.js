const { Router } = require("express");
const PackageController = require("../controller/packageController");

const packageController = new PackageController()

const packageRoutes = Router()

packageRoutes.post('/register', packageController.register)
packageRoutes.delete('/delete', packageController.delete)
packageRoutes.put('/update', packageController.update)
packageRoutes.get('/', packageController.findMany)
packageRoutes.get('/findManyDeliveryUser', packageController.findManyDeliveryUser)

module.exports = packageRoutes