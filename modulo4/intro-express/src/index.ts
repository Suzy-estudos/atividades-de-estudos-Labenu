import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

//Base url: http://localhost:3003

/*
## Exercício 1
Faça a instalação e configuração do Express na pasta do exercício. Para testar, 
crie um endpoint que aponte para a URL base da API. Esse endpoint pode responder 
apenas com uma mensagem de “Servidor funcionando!”.

Dicas:
- URL base de uma API é definida por “/”
*/

app.get('/', (req: Request, res: Response) => {
    res.send("Servidor funcionando!")
})

/*
## Exercício 2
Crie um array de usuários para servir como base de dados da nossa API e inicialize-o 
com 3 usuários. Cada usuário será representado pelas seguintes propriedades:
- id: Identificação do usuário na lista.
- name: Nome do usuário.
- phone: Número de telefone do usuário.
- email: E-mail do usuário.

Dicas:
- Os usuários devem ser representados por um type específico, com as propriedades 
  definidas anteriormente.
- A lista de usuários será um type[ ].
- Você pode armazenar esta lista dentro do próprio arquivo da atividade ou criar um 
  arquivo .json e importá-la (e também tipar) para o contexto da atividade.
*/

type Usuario = {
    id: number,
    name: string,
    phone: number,
    email: string
}

let listaUsuarios: Usuario[] = [
    {
        id: 1,
        name: "Suzy",
        phone: 1191234-5678,
        email: "suzy@labenu.com"
    },
    {
        id: 2,
        name: "Astrodev",
        phone: 1198765-4321,
        email: "astrodev@labenu.com"
    },
    {
        id: 3,
        name: "Bananinha",
        phone: 1191827-3645,
        email: "bananinha@labenu.com"
    },
]

/*
## Exercício 3
Construa um endpoint que retorne todos os usuários criados no Exercício 2.

Entradas → Nenhuma.
Saídas → Lista de usuários.
*/

app.get('/usuarios', (req: Request, res: Response) => {
    res.status(200).send(listaUsuarios)
})

/*
## Exercício 4
Construa um endpoint que busca um usuário baseado em sua id.

Entradas → Identificação do usuário.
Saídas → Usuário e seus respectivos dados.

Dicas:
- Utilize o params para identificar o usuário selecionado.
- Utilize o método .filter() para identificar o usuário selecionado.
*/

app.get('/usuarios/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const usuario = listaUsuarios.filter(usuario => usuario.id === id)
    res.status(200).send(usuario)
})

/*
## Exercício 5
Construa um endpoint que permita alterar o telefone de um usuário baseado em sua id.

Entradas → Identificação do usuário e novo valor para telefone do usuário.
Saídas → Mensagem de sucesso e usuário com valor alterado.

Dicas:
- Utilize o params para identificar o usuário a ser alterado.
- Utilize o body para receber o novo telefone do usuário.
- Utilize o método .map() para identificar o usuário selecionado e efetuar a modificação.
*/

app.put('/usuario/:id', (req: Request, res: Response) => {
    const id:number = Number(req.params.id)
    const { phone } = req.body
    let usuarioAlterado:Usuario[] = []

    listaUsuarios.map((usuario) => {

        if(usuario.id === id){
            usuario.phone = phone
            usuarioAlterado.push(usuario)
        }
    })

    res.status(200).send(["Usuário alterado com sucesso!", usuarioAlterado])
})

/*
## Exercício 6
Construa um endpoint para deletar um usuário baseado em sua id.

Entradas → Identificação do usuário.
Saídas → Mensagem de sucesso da operação.

Dicas:
- Utilize o params para identificar o usuário a ser removido.
- Utilize o método .filter() para promover a remoção.
*/

app.delete('/usuario/:id', (req: Request, res: Response) => {
    const id:number = Number(req.params.id)
    const index:number = listaUsuarios.findIndex(usuario => usuario.id === id)
    listaUsuarios.splice(index, 1)

    res.status(200).send(listaUsuarios)
})


app.listen(3003, () => console.log("Servidor rodando na porta 3003!")) 