const { Router } = require('express');

const DeliverymanController = require('../controller/DeliverymanController');

const deliverymanRoutes = Router();

const deliverymanController = new DeliverymanController();

deliverymanRoutes.post('/register', deliverymanController.register);
deliverymanRoutes.get('/login', deliverymanController.login);
deliverymanRoutes.delete('/delete', deliverymanController.delete);
deliverymanRoutes.put('/update/:id', deliverymanController.update);
deliverymanRoutes.get('/', deliverymanController.findMany);
deliverymanRoutes.get(
  '/findManyDeliveryUser',
  deliverymanController.findManyPackage,
);

module.exports = deliverymanRoutes;
