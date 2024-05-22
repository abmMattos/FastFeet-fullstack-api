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

}

module.exports = DeliverymanController