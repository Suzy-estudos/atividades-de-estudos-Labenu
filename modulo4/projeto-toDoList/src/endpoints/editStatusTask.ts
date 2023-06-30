/*
## Endpoint 6) Editar Status de uma Tarefa
Este endpoint edita o status de uma tarefa, que só assume os valores: 
“A FAZER”, “FAZENDO” e “FEITO” conforme a query do arquivo migrations na criação 
da tabela de tarefas “Tasks”.

Método: PUT

Rota de requisição: “/tasks/:taskId”

Entradas → Id da tarefa selecionada.

Validação de Input:
- Status deve existir e assumir um dos seguintes valores: “A FAZER”, “FAZENDO” ou “FEITO”.

Regras de Negócio:
- Id da tarefa deve existir no banco de dados.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo 
  a situação.
- Para sucesso, deve retornar o status de alteração e mensagem de sucesso da operação.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const editStatusTask = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId
        const status = req.body.status as string 

        if (!status) {
            errorCode = 422
            throw new Error("Erro: Parâmetro ausente.");
        }

        if (status !== "TO_DO" && status !== "DOING" && status !== "DONE") {
            errorCode = 422
            throw new Error("Erro: Parâmetro deve conter um dos seguintes valores: TO_DO, DOING ou DONE.");
        }

        const [checkTask] = await connection.raw(`
        SELECT * FROM Tasks
        WHERE id = ${taskId};
        `)
        const idTaskFound = checkTask[0]

        if (!idTaskFound) {
            errorCode = 404
            throw new Error("Erro: Tarefa não encontrada.");
        }

        await connection.raw(`
        UPDATE Tasks
        SET status = "${status}"
        WHERE id = ${taskId}
        `)

        res.status(200).send({mensagem: "Status alterado com sucesso!"})

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}