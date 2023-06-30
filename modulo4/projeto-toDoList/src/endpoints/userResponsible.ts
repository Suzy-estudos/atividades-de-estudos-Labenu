/*
## Endpoint 3) Pegar Usuários Responsáveis por uma Tarefa
Este endpoint retorna o usuário (apenas id e apelido) responsável por uma 
determinada tarefa. Esta relação é estabelecida pela tabela “Responsibles” do template.

Método: GET

Rota de requisição: “/tasks/:taskId/users”

Entradas → Id da tarefa selecionada.

Validação de Input → Nenhuma.

Regras de Negócio → Id da tarefa deve existir no banco de dados.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo 
  a situação.
- Para sucesso, deve retornar o status de recebimento, mensagem de sucesso e a lista 
  de usuários selecionados. 
  A lista de usuários deve ser exibida apenas pelo seu id e nickname.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const userResponsible = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId as string

        const [idTask] = await connection.raw(`
        SELECT * FROM Tasks
        WHERE id = "${taskId}";
        `)

        const idFound = idTask[0]

        if (!idFound) {
            errorCode = 404
            throw new Error("Erro: Tarefa não encontrada.");
        }

        const [result] = await connection.raw(`
        SELECT 
        Users.id,
        Users.nickname
        FROM Responsibles
        JOIN Users
        ON Responsibles.userId = Users.id
        WHERE taskId = "${taskId}";
        `)

        if(!result[0]){
            res.status(200).send({mensagem: "Tarefa não atribuída a um usuário responsável."})
        } else {
            res.status(200).send({users: result})
        }

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}