/*
## Endpoint 4) Adicionar Usuário Responsável a um Tarefa
Este endpoint adiciona um responsável por uma tarefa. 
Um usuário pode ser atribuído a realizar múltiplas tarefas, 
mas não deve ser possível atribuir a mesma tarefa a mais de um usuário ao mesmo tempo. 
Esta relação é estabelecida pela tabela “Responsibles” do template.

Método: POST

Rota de requisição: “/tasks/:taskId/users”

Entradas → Id da tarefa e do usuário selecionado.

Validação de Input → Nenhuma.

Regras de Negócio:
- Id da tarefa e do usuário devem ser compatíveis com registros existentes em seus 
  respectivos bancos de dados.
- O usuário só poderá ser registrado uma única vez para cada tarefa selecionada.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo 
  a situação.
- Para sucesso, deve retornar o status de criação e mensagem de sucesso da operação.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const addResponsibleUser = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const taskId = req.params.taskId
        const userId = req.body.userId

        const [verificationTask] = await connection.raw(`
        SELECT * FROM Tasks
        WHERE id = ${taskId};
        `)
        const idTaskFound = verificationTask[0]

        if (!idTaskFound) {
            errorCode = 404
            throw new Error("Erro: Tarefa não encontrada.");
        }

        const [checkUser] = await connection.raw(`
        SELECT * FROM Users
        WHERE id = ${userId};
        `)
        const idUserFound = checkUser[0]

        if (!idUserFound) {
            errorCode = 404
            throw new Error("Erro: Usuário não encontrado.");
        }

        const [checkTask] = await connection.raw(`
        SELECT * FROM Responsibles
        WHERE userId = ${userId} AND taskId = ${taskId};
        `)
        const taskFound = checkTask[0]

        if (taskFound) {
            errorCode = 409
            throw new Error("Erro: Usuário já atribuído anteriormente como responsável por essa tarefa.");

        } else {
            const newTask = {
                userId: userId,
                taskId: taskId
            }

            await connection.raw(`
            INSERT INTO Responsibles (userId, taskId)
            VALUES ("${newTask.userId}", "${newTask.taskId}");
            `)

            res.status(201).send({ mensagem: "Tarefa atribuída ao usuário com sucesso!"})
        }

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}