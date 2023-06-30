/*
## Endpoint 5) Editar Apelido do Usuário
Este endpoint permite que editemos o apelido de um usuário buscado pelo seu id.

Método: PUT

Rota de requisição: “/users/:userId”

Entradas → Id do usuário selecionado.

Validação de Input:
- nickname (apelido) deve existir e ser do tipo string.
- nickname (apelido) deve ter ao menos 3 caracteres.

Regras de Negócio:
- Id do usuário deve existir no banco de dados.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo 
  a situação.
- Para sucesso, deve retornar o status de alteração e mensagem de sucesso da operação.
*/
import { Request, Response } from "express"
import connection from "../database/connection"

export const editUserNickname = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const userId = req.params.userId
        const nickname = req.body.nickname

        if (!nickname) {
            errorCode = 422
            throw new Error("Erro: Parâmetro ausente.");
        }

        if (typeof nickname !== "string") {
            errorCode = 422
            throw new Error("Erro: Parâmetro deve ser do tipo string.");
        }

        if (nickname.length < 3){
            errorCode = 422
            throw new Error("Erro: Parâmetro deve conter no mínimo 3 caracteres.");
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

        await connection.raw(`
        UPDATE Users
        SET nickname = "${nickname}"
        WHERE id = ${userId}
        `)

        res.status(200).send({mensagem: "Apelido alterado com sucesso!"})
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}