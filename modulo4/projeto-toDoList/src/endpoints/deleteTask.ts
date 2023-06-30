/*
## Endpoint 7) Deletar uma tarefa
Este ENDPOINT permite que deletemos uma tarefa com base em seu ID.

Método: DELETE

Rota de requisição: “/tasks/:taskId”

Entradas → Id da tarefa selecionada.

Validação de Input → Nenhuma.

Regras de Negócio:
- Id da tarefa deve ser compatível com registro existente em banco de dados.
- Deleção de tarefas necessita de remoção de usuários destacados para esta tarefa.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo 
  a situação.
- Para sucesso, deve retornar o status de deleção e mensagem de sucesso da operação.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const deleteTask = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId

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
        DELETE FROM Responsibles
        WHERE taskId = "${taskId}";
        `)

        await connection.raw(`
        DELETE FROM Tasks
        WHERE id = "${taskId}";
        `)

        res.status(200).send({mensagem: "Tarefa deletada com sucesso!"})

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}