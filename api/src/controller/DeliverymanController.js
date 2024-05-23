const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class DeliverymanController {


    async register(request, response) {
        try {
            const { name, email, cpf, password } = request.body
            const register = await prisma.deliveryman.create({
                data: {
                    name,
                    email,
                    cpf,
                    password
                }
            })
            response.json(register)
        } catch {
            return response.status(409).send()
        }
    }

    async login(request, response) {
        try {
            const { cpf, password } = request.body
            await prisma.deliveryman.findUnique({
                where: {
                    cpf: cpf,
                    password: password
                }
            })
            return response.status(200).send()
        } catch {
            return response.status(404).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            await prisma.deliveryman.delete({
                where: {
                    id
                }
            })
            response.status(200).send()
        } catch {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, name, email, password } = request.body
            await prisma.deliveryman.update({
                where: {
                    id
                },
                data: {
                    name,
                    email,
                    password
                }
            })
            return response.status(200).send()
        } catch {
            return response.status(409).send()
        }
    }
}

module.exports = DeliverymanController