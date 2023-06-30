import express, { Request, Response } from 'express'
import cors from 'cors'
import { Produto, produtos } from './data'
import { send } from 'process'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003.")
})

/*
## Exercício 1
Crie uma nova API do zero (ou utilizando um template) e desenvolva um endpoint de teste 
com método  GET no path “/test” que retorna uma mensagem genérica avisando que a API 
está funcional.
*/
app.get('/test', (req: Request, res: Response) => {
    try {
        res.status(200).send({
            mensagem: "A API está funcional."
        })
    } catch (error) {
        res.send({ mensagem: error.message })
    }
})

/*
## Exercício 2
Crie um arquivo chamado data.ts que exporta um array de produtos. 
Cada produto será representado por um objeto com propriedades: 
    - id (string), 
    - name (string),
    - price (number) 
    
Insira manualmente ao menos 3 produtos neste array.

Dicas:
- Os produtos devem ser representados por um type específico, com as propriedades definidas anteriormente.
- A lista de produtos será um type[ ]
*/
//ARQUIVO EXTERNO CRIADO

/*
## Exercício 3
Crie um endpoint que retorna todos os produtos existentes na lista.

Entradas → Nenhuma

Validação de Input → Nenhuma

Regras de negócio → Nenhuma

Saídas possíveis:
    - Sucesso: mensagem de sucesso e a lista de produtos.
    - Erro: mensagem de erro.
*/
app.get('/produtos', (req: Request, res: Response) => {
    try {
        res.status(200).send({
            mensagem: "Lista de produtos",
            produtos: produtos
        })

    } catch (error) {
        res.send({ mensagem: error.message })
    }
})

/*
## Exercício 4
Desenvolva um endpoint que cria um novo produto e retorna a lista de produtos atualizada. 
A id do produto deve ser gerada automaticamente pela API.

Entradas → name e price do produto.

Validação de Input:
    - name e price devem existir.
    - name deve ser uma string.
    - price deve ser um number.

Regras de negócio → price deve ser um valor maior que 0.

Saídas possíveis:
    - Sucesso: mensagem de sucesso e a lista de produtos atualizada.
    - Erro: mensagem de erro.
*/
app.post('/produtos', (req: Request, res: Response) => {
    try {
        const { name, price } = req.body

        if (!name || !price) {
            res.statusCode = 422
            throw new Error("Erro: parâmetros ausentes.");
        }

        if (typeof name !== "string") {
            res.statusCode = 422
            throw new Error("Erro: parâmetro 'name' deve ser do tipo string.");
        }

        if (typeof price !== "number") {
            res.statusCode = 422
            throw new Error("Erro: parâmetro 'price' deve ser do tipo number.");
        }

        if (price <= 0) {
            res.statusCode = 422
            throw new Error("Erro: parâmetro 'price' deve ser valor maior que 0.");
        }

        const novoProduto: Produto = {
            id: Date.now().toString(),
            name: name,
            price: price
        }

        produtos.push(novoProduto)

        res.status(201).send({
            mensagem: "Novo produto adicionado à lista",
            produtos: produtos
        })

    } catch (error) {
        res.send({ mensagem: error.message })
    }
})

/*
## Exercício 5
Crie um endpoint que edita o preço de um determinado produto e retorna o produto atualizado.

Entradas → id e novo preço do produto.

Validação de Input:
    - id e e price devem existir.
    - price deve ser do tipo number.

Regras de negócio:
    - price deve ser um valor maior que 0.
    - se a id do produto não existir, disparar erro com mensagem adequada

Saídas possíveis:
    - Sucesso: mensagem de sucesso e o produto atualizado.
    - Erro: mensagem de erro.
*/
app.put('/produtos/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { price } = req.body

        if (!id || !price) {
            res.statusCode = 422
            throw new Error("Erro: parâmetros ausentes.");
        }

        if (typeof price !== "number") {
            res.statusCode = 422
            throw new Error("Erro: parâmetro 'price' deve ser do tipo number.");
        }

        if (price <= 0) {
            res.statusCode = 422
            throw new Error("Erro: parâmetro 'price' deve ser valor maior que 0.");
        }

        const precoEditado = produtos.map((produto) => {
            if (produto.id === id) {
                produto.price = price
            }
            return produto
        }).filter((item) => {
            return item.id === id
        })

        res.status(200).send({
            mensagem: "Preço editado",
            produto: precoEditado
        })

    } catch (error) {
        res.send({ mensagem: error.message })
    }
})

/*
## Exercício 6
Construa um endpoint que deleta um determinado produto.

Entradas → id do produto.
Validação de Input:
    - id deve existir.

Regras de negócio:  
    - se a id do produto não existir, disparar erro com mensagem adequada

Saídas possíveis:
    - Sucesso: mensagem de sucesso.
    - Erro: mensagem de erro.
*/
app.delete('/produtos/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!id) {
            res.statusCode = 422
            throw new Error("Erro: parâmetro 'id' não informado.")
        }

        const listaAtualizada = produtos.filter((produto) => {
            return produto.id !== id
        })

        res.status(200).send({
            mensagem: "Lista atualizada",
            produtos: listaAtualizada
        })

    } catch (error) {
        res.send({ mensagem: error.message })
    }
})