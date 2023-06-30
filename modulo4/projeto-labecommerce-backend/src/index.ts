import { createProduct } from './endpoints/createProduct';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ping } from './endpoints/ping'
import { createUser } from './endpoints/createUser'
import { searchUsers } from './endpoints/searchUsers'
import { searchProducts } from './endpoints/searchProducts';
import { registerPurchase } from './endpoints/registerPurchase';
import { searchUserPurchases } from './endpoints/searchUserPurchases';

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

// Endpoint de teste
app.get("/ping", ping)

// Endpoint de cadastro de usuário
app.post("/users", createUser)

// Endpoint de busca de usuários
app.get("/users", searchUsers)

// Enpoint de cadastro de produto
app.post("/products", createProduct)

// Endpoind de busca de produtos
app.get("/products", searchProducts)

// Endpoint de registro de compra
app.post("/purchases", registerPurchase)

// Endpoint de busca das compras de um usuário
app.get("/users/:userId/purchases", searchUserPurchases)