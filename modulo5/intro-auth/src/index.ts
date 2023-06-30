import { UserController } from './controller/UserController';
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { PingController } from './controller/PingController'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

const pingController = new PingController()
const userController = new UserController()

// Endpoint de teste
app.get("/ping", pingController.ping)

// Exercício 1 - Endpoint signup (cadastra novos usuários)
app.post("/signup", userController.signup)

// Exercício 2 - Endpoint login (logar usuários já cadastrados)
app.post("/login", userController.login)

// Exercício 3 - Endpoit getAllUsers or by nickname (busca completa de todos os usuários cadastrados ou por nickname)
app.get("/users", userController.getAllUsers)

// Exercício 4 - Endpoint editUser (edição de dados do próprio usuário)
app.put("/users", userController.editUser)

// Exercício 5 - Endpoint deleteUser (deleta via id a conta de um usuário cadastrado)
app.delete("/users", userController.deleteUser)
