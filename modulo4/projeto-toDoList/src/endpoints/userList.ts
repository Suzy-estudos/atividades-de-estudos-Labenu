/*
## Endpoint 1) Pegar Lista de Usuários
Este endpoint permite que ao consumir a requisição seja possível recebermos a lista 
completa de usuários ou fazermos uma busca por parte do nome ou apelido do usuário.

Método: GET

Rota de requisição: “/users”

Entradas → Variável de busca “search” opcional (query params).

Validação de Input → Nenhuma.

Regras de Negócio → Nenhuma.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo a situação.
- Para sucesso, deve retornar o status de recebimento, mensagem de sucesso e a lista de usuários selecionados.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const userList = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const search = req.query.search as string

        if (search) {
            const [result] = await connection.raw(`
            SELECT * FROM Users
            WHERE LOWER(name) LIKE "%${search.toLowerCase()}%" OR LOWER(nickname) LIKE "%${search.toLowerCase()}%";
           `)

            res.status(200).send({ user: result })
        }

        const [result] = await connection.raw(`
        SELECT * FROM Users;
        `)

        res.status(200).send({ users: result })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}