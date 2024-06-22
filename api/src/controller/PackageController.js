const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class PackageController {
  async register(request, response) {
    try {
      const { user_id, status, deliveryman_id, location } = request.body;
      const packages = await prisma.package.create({
        data: {
          status,
          location,
          deliveryman_id,
          user_id,
        },
      });
      return response.json(packages);
    } catch {
      return response.status(409).send('Erro ao criar Package!');
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.body;
      await prisma.package.delete({
        where: {
          id,
        },
      });
      return response.status(200).send('Package excluido!');
    } catch {
      return response.status(409).send('Erro ao excluir!');
    }
  }

  async update(request, response) {
    try {
      const { id, status, location } = request.body;
      await prisma.package.update({
        where: {
          id,
        },
        data: {
          status,
          location,
          photo,
        },
      });
      return response.status(200).send('Package atualizado com sucesso!');
    } catch {
      return response.status(409).send('Erro ao atualizar Package!');
    }
  }

  async findMany(request, response) {
    try {
      const packages = await prisma.package.findMany();

      return response.json(packages);
    } catch (err) {
      return response.status(409).send('Erro ao buscar Package!');
    }
  }

  async findManyDeliveryUser(request, response) {
    try {
      const { id } = request.body;
      const packages = await prisma.package.findUnique({
        where: {
          id: id,
        },
        include: {
          deliveryman_id: true,
          user_id: true,
        },
      });

      return response.json(packages);
    } catch (err) {
      return response.status(409).send('Erro ao buscar Package!');
    }
  }
}

module.exports = PackageController;
