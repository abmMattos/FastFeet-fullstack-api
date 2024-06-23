const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class DeliverymanController {
  async register(request, response) {
    try {
      const { name, email, cpf, password, location } = request.body;
      const register = await prisma.deliveryman.create({
        data: {
          name,
          email,
          cpf,
          password,
          location,
        },
      });
      response.json(register);
    } catch {
      return response.status(409).send('Erro ao criar DeliveryMan!');
    }
  }

  async login(request, response) {
    try {
      const { cpf, password } = request.body;
      await prisma.deliveryman.findUnique({
        where: {
          cpf: cpf,
          password: password,
        },
      });
      return response.status(200).send('Login realizado!');
    } catch {
      return response.status(404).send('Erro ao logar!');
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.body;
      await prisma.deliveryman.delete({
        where: {
          id,
        },
      });
      response.status(200).send('DeliveryMan excluido!');
    } catch {
      return response.status(409).send('Erro ao excluir!');
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, email, password, location } = request.body;
      await prisma.deliveryman.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          location,
        },
      });
      return response.status(200).send('DeliveryMan atualizado com sucesso!');
    } catch {
      return response.status(409).send('Erro ao atualizar DeliveryMan!');
    }
  }

  async findOne(request, response) {
    try {
      const { id } = request.params;
      const user = await prisma.deliveryman.findFirst({ where: { id: id } });

      response.json(user);
    } catch (err) {
      return response.status(409).send('Erro ao buscar Usuário!');
    }
  }

  async findMany(request, response) {
    try {
      const delivery = await prisma.deliveryman.findMany({});

      console.log(delivery);

      return response.json(delivery);
    } catch (err) {
      return response.status(409).send('Erro ao buscar Deliveryman!');
    }
  }

  async findManyPackage(request, response) {
    try {
      const { id } = request.body;
      const delivery = await prisma.deliveryman.findUnique({
        where: {
          id: id,
        },
        include: {
          package: true,
        },
      });

      return response.json(delivery);
    } catch (err) {
      return response
        .status(409)
        .send('Erro ao buscar Packages do DeliveryMan!');
    }
  }
}

module.exports = DeliverymanController;
