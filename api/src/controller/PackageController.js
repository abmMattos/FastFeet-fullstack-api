const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PackageController {
  async register(request, response) {
    try {
      const { user_name, status, deliveryman_name, location } = request.body;

      const foundUser = await prisma.user.findFirst({
        where: { name: user_name },
      });

      console.log('ESTOU AQUI', foundUser);

      if (!foundUser) {
        return response.status(404).send('User not found!');
      }

      const foundDeliveryman = await prisma.deliveryman.findFirst({
        where: { name: deliveryman_name },
      });

      if (!foundDeliveryman) {
        return response.status(404).send('Deliveryman not found!');
      }

      const newPackage = await prisma.package.create({
        data: {
          status,
          location,
          deliveryman_id: foundDeliveryman['id'],
          user_id: foundUser['id'],
        },
      });
      return response.json(newPackage);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error creating package!');
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.body;

      const existingPackage = await prisma.package.findUnique({
        where: { id },
      });

      if (!existingPackage) {
        return response.status(404).send('Package not found!');
      }

      await prisma.package.delete({
        where: { id },
      });
      return response.status(200).send('Package deleted!');
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error deleting package!');
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { status, location, photo } = request.body;

      const existingPackage = await prisma.package.findUnique({
        where: { id },
      });

      if (!existingPackage) {
        return response.status(404).send('Package not found!');
      }

      const updatedPackage = await prisma.package.update({
        where: { id },
        data: {
          status,
          location,
          photo,
        },
      });
      return response.status(200).send('Package updated successfully!');
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error updating package!');
    }
  }

  async findOne(request, response) {
    try {
      const { id } = request.params;
      const user = await prisma.package.findFirst({ where: { id: id } });

      response.json(user);
    } catch (err) {
      return response.status(409).send('Erro ao buscar Usuário!');
    }
  }

  async findMany(request, response) {
    try {
      const packages = await prisma.package.findMany();
      return response.json(packages);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error fetching packages!');
    }
  }

  async findManyDeliveryUsers(request, response) {
    try {
      const { deliverymen_ids, users_ids } = request.body;

      if (
        !Array.isArray(deliverymen_ids) ||
        deliverymen_ids.length === 0 ||
        !Array.isArray(users_ids) ||
        users_ids.length === 0
      ) {
        return response.status(400).send('Invalid input data!');
      }

      const deliverymen = await prisma.deliveryman.findMany({
        where: {
          id: { in: deliverymen_ids },
        },
      });

      const users = await prisma.user.findMany({
        where: {
          id: { in: users_ids },
        },
      });

      return response.json({ deliverymen, users });
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error fetching deliverymen and users!');
    }
  }
}

module.exports = PackageController;
