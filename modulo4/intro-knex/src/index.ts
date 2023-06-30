import express, { Request, Response } from "express";
import cors from "cors";
import connection from "./database/connection";
import { Funcionario } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

/*### Exercício 1
Crie um endpoint de busca de usuários cadastrados. 
Este endpoint deve permitir a busca por partes do nome. 
Caso nenhum valor de busca seja recebido, retornamos todos os usuários.

Entradas → ‘search’ é uma variável opcional de busca.

Validação de Input → Nenhuma.

Regras de Negócios → Nenhuma.

Saídas → Erro de requisição, lista de usuários selecionados ou toda a lista.

Dicas:
- Utilize o connection para estabelecer a conexão com o banco de dados.
- ‘search’ é uma query opcional.
*/
app.get('/funcionarios', async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const busca = req.query.busca as string

    if (busca) {
      const [nome] = await connection.raw(`
      SELECT * FROM Funcionarios
      WHERE LOWER(name) LIKE "%${busca.toLowerCase()}%";
      `)

      res.status(200).send({ funcionarios: nome })
    }

    const [resultado] = await connection.raw(`
    SELECT * FROM Funcionarios;
    `)

    res.status(200).send({ funcionarios: resultado })

  } catch (error) {
    res.status(errorCode).send({ erro: error.message })
  }
})

/*
### Exercício 2
Desenvolva um endpoint que cria um novo usuário e retorna as informações do mesmo. 
A id do usuário deve ser gerada automaticamente pela API.

Entradas → name e email do usuário.

Validação de Input:
- name e email devem existir.
- name e email devem ser do tipo string.
- O email deve possuir o caractere @

Regras de negócio:
- O email é único para cada usuário.
- O nome do usuário deve ter ao menos 4 caracteres.
- A id é gerada automaticamente.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo a situação.
- Para sucesso, deve retornar o status de criação, mensagem de sucesso e o usuário atualizado.

Dicas:
- Utilize o connection para estabelecer a conexão com o banco de dados.
- Para validar um e-mail no formato definido, você pode utilizar o método .includes() para verificar se 
  existem os caracteres “@”(arroba) no e-mail enviado pelo client. 
  Se estiver confortável tente utilizar um RegEx (Regular Expression) de validação de e-mail.
- Para não se preocupar em contar o tamanho da lista ao criar uma id automatizada, utilize o Date.now().
- Para conferir o registro do novo usuário, utilize a requisição do exercício 1.
*/
app.post("/funcionarios", async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const { nome, email } = req.body

    if (!nome || !email) {
      errorCode = 422
      throw new Error("Erro: Parâmetros ausentes.");
    }

    if (typeof nome !== "string" || typeof email !== "string") {
      errorCode = 422
      throw new Error("Erro: Os parâmetros devem ser do tipo string.");
    }

    if (!email.includes("@")) {
      errorCode = 422
      throw new Error("Erro: E-mail inválido.");
    }

    const [funcionarios] = await connection.raw(`
    SELECT * FROM Funcionarios
    WHERE email = "${email}";
    `)

    const funcionarioEncontrado = funcionarios[0]

    if (funcionarioEncontrado) {
      errorCode = 409
      throw new Error("Erro: E-mail já cadastrado.");
    }

    if (nome.length < 4) {
      errorCode = 422
      throw new Error("Erro: O nome deve conter no mínimo 4 caracteres.");
    }

    const novoFuncionario: Funcionario = {
      id: Date.now(),
      nome: nome,
      email: email
    }

    await connection.raw(`
    INSERT INTO Funcionarios (id, nome, email)
    VALUES ("${novoFuncionario.id}", "${novoFuncionario.nome}", "${novoFuncionario.email}");
    `)

    res.status(201).send({ mensagem: "Funcionário cadastrado com sucesso!", funcionario: novoFuncionario })

  } catch (error) {
    res.status(errorCode).send({ erro: error.message })
  }
})

/*
### Exercício 3
Crie um endpoint que edita o e-mail de um determinado usuário.

Entradas → id e novo email do usuário.

Validação de Input:
- O email deve existir.
- O email deve ser do tipo string.
- O e-mail deve possuir o caractere @

Regras de negócio:
- Se o id fornecido não corresponder a um usuário existente, um erro deverá ser exibido.
- O email é único para cada usuário.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo a situação.
- Para sucesso, deve retornar o status de edição e mensagem de sucesso.

Dicas:
- Utilize o connection para estabelecer a conexão com o banco de dados.
- Para validar um e-mail no formato definido, você pode utilizar o método .includes() para verificar se 
  existem os caracteres “@”(arroba) no e-mail enviado pelo client. 
  Se estiver confortável tente utilizar um RegEx (Regular Expression) de validação de e-mail.
- Para conferir o registro da alteração de dados, utilize a requisição do exercício 1.
*/
app.put("/funcionarios/:id", async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const id = req.params.id
    const email = req.body.email as string

    if (!email) {
      errorCode = 422
      throw new Error("Erro: Parâmetro ausente.");
    }

    if (typeof email !== "string") {
      errorCode = 422
      throw new Error("Erro: O parâmetro e-mail deve ser do tipo string.");
    }

    if (!email.includes("@")) {
      errorCode = 422
      throw new Error("Erro: E-mail inválido.");
    }

    const [funcionariosId] = await connection.raw(`
    SELECT * FROM Funcionarios
    WHERE id = "${id}";
    `)
    const funcionarioEncontradoId = funcionariosId[0]

    if (!funcionarioEncontradoId) {
      errorCode = 404
      throw new Error("Erro: Id do funcionário não encontrado.");
    }

    const [funcionarios] = await connection.raw(`
    SELECT * FROM Funcionarios
    WHERE email = "${email}";
    `)
    const funcionarioEncontrado = funcionarios[0]

    if (funcionarioEncontrado) {
      errorCode = 409
      throw new Error("Erro: E-mail já cadastrado.");
    }

    await connection.raw(` 
    UPDATE Funcionarios
    SET email = "${email}"
    WHERE id = "${id}";
    `)

    res.status(200).send({ mensagem: "E-mail atualizado com sucesso!" })

  } catch (error) {
    res.status(errorCode).send({ erro: error.message })
  }
})

/*
### Exercício 4
Construa um endpoint que deleta um determinado usuário.

Entradas → id do usuário a ser deletado.

Validação de Input → Nenhuma.

Regras de negócio:
- Se o id fornecido não corresponder a um usuário existente, um erro deverá ser exibido.

Saídas possíveis:
- Cada erro deve retornar o seu respectivo status code e uma mensagem descrevendo a situação.
- Para sucesso, deve retornar o status de remoção e mensagem de sucesso.
*/
app.delete("/funcionarios/:id", async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const id = req.params.id

    if(!id){
      errorCode = 422
      throw new Error("Erro: Parâmetro ausente.");

    }

    const [funcionariosId] = await connection.raw(`
    SELECT * FROM Funcionarios
    WHERE id = "${id}";
    `)
    const funcionarioEncontradoId = funcionariosId[0]

    if (!funcionarioEncontradoId) {
      errorCode = 404
      throw new Error("Erro: Id do funcionário não encontrado.");
    }

    await connection.raw(`
    DELETE FROM Funcionarios
    WHERE id = ${id};
    `)

    res.status(200).send({mensagem: "Cadastro deletado com sucesso!"})

  } catch (error) {
    res.status(errorCode).send({ erro: error.message })
  }
}) 