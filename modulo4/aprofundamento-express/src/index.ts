import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log('O servidor está rodando na porta 3003.')
})

/*
## Exercício 1
Faça novamente a instalação e configuração do Express na pasta do exercício. 
Para testar, crie um endpoint que aponte para o path “/ping”. 
Esse endpoint pode responder apenas com uma mensagem “Pong!”.
*/

app.get('/ping', (req: Request, res: Response) => {
    return res.send("Pong!")
})

/*
## Exercício 2
Acesse a API do JSONPlaceholder e analise os endpoints que buscam 
[afazeres](https://jsonplaceholder.typicode.com/todos) (”*todos”*). 
Crie um array de afazeres para servir como base de dados da nossa API e insira 
2 afazeres para cada usuário no respectivo array (2 a 3 usuários). 
Cada afazer será representado pelas seguintes propriedades:
- userId: Usuário que é responsável pelo afazer.
- id: Identificação de um afazer na lista.
- title: Descrição de um afazer.
- completed: Status do afazer, alternando entre completo (true) ou incompleto (false)

Observação: Não se preocupem quanto a criar e tipar os usuários, nesta atividade eles 
serão representados apenas pelo seu userId.

Dicas:
- Os afazeres devem ser representados por um type específico, com as propriedades 
  definidas anteriormente.
- A lista de afazeres será um type[ ].
- Você pode armazenar esta lista dentro do próprio arquivo da atividade ou criar um 
  arquivo .json e importá-la (e também tipar) para o contexto da atividade.
*/

type Tarefa = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

let afazeres: Tarefa[] = [
    {
        userId: 1,
        id: 1,
        title: "Arrumar a cama",
        completed: false
    },
    {
        userId: 1,
        id: 2,
        title: "Preparar o café",
        completed: false
    },
    {
        userId: 2,
        id: 3,
        title: "Levar as crianças à escola",
        completed: false
    },
    {
        userId: 2,
        id: 4,
        title: "Fazer compras",
        completed: false
    },
    {
        userId: 3,
        id: 5,
        title: "Preparar o almoço",
        completed: false
    },
    {
        userId: 3,
        id: 6,
        title: "Lavar a louça",
        completed: false
    },
]

/*## Exercício 3
Construa um endpoint que retorne todos os afazeres de um determinado usuário.

Entradas → Identificação do usuário.
Saídas → Lista de afazeres selecionados por usuário.

Dicas:
- Utilize um path params para identificar o usuário selecionado.
- Utilize o método .filter() para identificar o usuário selecionado.
*/

app.get('/afazeres/:userId', (req: Request, res: Response) => {
    const userId = Number(req.params.userId)

    const resultado = afazeres.filter((afazer) => {
        return afazer.userId === userId
    })
    res.send({
        usuario: userId,
        Afazeres: resultado
    })

})

/*
## Exercício 4
Construa um endpoint de criação de afazer. A resposta deve retornar uma mensagem de 
sucesso e o array de afazeres atualizado.

Entradas → Dados de cadastro de um novo afazer (apenas o id do usuário e title).
Saídas → Mensagem de sucesso da operação e lista de afazeres atualizada.

Observação: A identificação do novo afazer dever ser criado pelo fluxo da requisição 
(não envie como entrada). O status inicial de um afazer deve iniciar como false.

Dicas:
- Utilize o body para receber as propriedades do novo afazer.
- Utilize o método .push() para atualizar a lista de afazeres.
*/

app.post('/afazeres', (req: Request, res: Response) => {
    const { userId, title } = req.body
    const ultimaTarefa = afazeres[afazeres.length - 1]

    const novaTarefa: Tarefa = {
        userId: userId,
        id: ultimaTarefa.id + 1,
        title: title,
        completed: false
    }

    afazeres.push(novaTarefa)

    res.send({
        mensagem: 'Tarefa adicionada com sucesso!',
        afazeres: afazeres
    })
})

/*
## Exercício 5
Construa um endpoint de edição do status de um afazer, ou seja, de completo para 
incompleto e vice-versa.

Entradas → Identificação do afazer a ser alterado o status.
Saídas → Mensagem de sucesso da operação e lista de afazeres atualizado.

Dicas:
- Utilize um path params para identificar o afazer a ser alterado.
- Utilize o método .map() para identificar o afazer selecionado e efetuar a modificação.
*/

app.put('/afazeres/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { completed } = req.body

    const resultado = afazeres.map((tarefa) => {
        if (tarefa.id === id) {
            return { ...tarefa, completed: completed }
        }
    })

    res.send({
        mensagem: "Status da tarefa atualizado!",
        afazeres: resultado
    })
})

/*
## Exercício 6
Construa um endpoint que deleta um determinado afazer de acordo com sua id.

Entradas → Identificação do afazer.
Saídas → Mensagem de sucesso da operação.

Dicas:
- Utilize um path params para identificar o afazer a ser removido.
- Utilize o método .filter() para promover a remoção.
*/

app.delete('/afazeres/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const index = afazeres.findIndex(tarefa => tarefa.id === id)

    afazeres.splice(index, 1)

    res.send({
        mensagem: "Tarefa deletada com sucesso!",
        afazeres: afazeres
    })
})

/*
## Exercício 7
Construa um endpoint que retorne a lista de afazeres, a depender do status de cada afazer. 
De maneira geral, o endpoint poderá:
- Retornar apenas os afazeres concluídos;
- Retornar apenas os afazeres incompletos;
- Retornar todos os afazeres listados, independente do status.

Entradas → Valor de status(opcional) para a propriedade “completed”.
Saídas → Lista dos afazeres selecionados por seu status ou todos os afazeres caso não 
a query não seja enviada.

Dicas:
- Utilize uma query params para receber o valor do status.
- Queries são informações opcionais num endpoint. Você pode utilizar este fato para 
  retornar todos os afazeres listados, caso o status não seja enviado na requisição.
*/

app.get('/afazeres', (req: Request, res: Response) => {
    const busca = req.query.busca

    if (busca !== "true" && busca !== "false") {
        return res.send({
            busca: busca,
            afazeres: afazeres
        })
    }

    if (busca === "true") {
        const resultado = afazeres.filter((afazer) => {
            return afazer.completed === true
        })

        return res.send({
            completa: busca,
            afazeres: resultado
        })
    } else {
        const resultado = afazeres.filter((afazer) => {
            return afazer.completed === false
        })

        return res.send({
            completa: busca,
            afazeres: resultado
        })
    }
})