/*
## Endpoint 2) Pegar Tarefas
Este endpoint permite que ao consumir a requisição seja possível recebermos a lista 
completa de tarefas ou fazer uma busca por parte do título ou descrição da tarefa.

Método: GET

Rota de requisição: “/tasks”

Entradas → Variável de busca “search” opcional (query params).

Validação de Input → Nenhuma.

Regras de Negócio → Nenhuma.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo a situação.
- Para sucesso, deve retornar o status de recebimento, mensagem de sucesso e a lista de tarefas selecionadas.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const tasksList = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const search = req.query.search as string

        if (search) {
            const [result] = await connection.raw(`
            SELECT * FROM Tasks
            WHERE LOWER(title) LIKE "%${search.toLowerCase()}%" OR LOWER(description) LIKE "%${search.toLowerCase()}%";
           `)

            res.status(200).send({ task: result })
        }

        const [result] = await connection.raw(`
        SELECT * FROM Tasks;
        `)

        res.status(200).send({ tasks: result })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}