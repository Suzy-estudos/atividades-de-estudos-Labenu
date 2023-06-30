# Projeto Cookenu Backend

### Descrição:
Desenvolvimento de um sistema simples de receitas culinárias. 
Este sistema permite o registro, acesso e manipulação de usuários e receitas.

## Instruções

### Instalando as dependências:
-   `npm install`:
    Instala todas as dependências listadas no `package.json`.

### Criando o arquivo .env:
Criar o arquivo `.env` e configurar com as informações de seu banco de dados.
```
PORT: 3003
DB_HOST = host
DB_USER = usuário
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
```

### Criando e Populando as tabelas:
-   `npm run migrations`
    Cria e Popula as tabelas, em conexão com o banco de dados.

### Executando o projeto:
-   `npm run dev`:
    Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.

## Funcionalidades

### Endpoints:
- `ping`
Endpoint de teste da API.

- `signup`
Endpoint para cadastrar novos usuários, onde sua senha seja armazenada de forma mais segura no formato hash. O token também deve possuir a propriedade “role”.

- `login`
Endpoint para logar usuários já cadastrados no sistema, com a verificação de usuário válido sendo feita pelo algoritmo de hash (comparação entre senha em plaintext e hash armazenado no banco de dados). O token também deve possuir a propriedade “role”.

- `createRecipe`
Endpoint que permite um usuário logado no sistema criar uma nova receita.

- `editRecipe`
Endpoint que permite um usuário logado no sistema alterar o título e/ou a descrição de uma receita existente. Usuários do tipo “NORMAL” só poderão alterar as receitas que foram criadas por eles mesmo, enquanto usuários do tipo “ADMIN” podem alterar qualquer receita.

- `deleteRecipe`
Endpoint que permite um usuário logado no sistema remover uma receita pela sua id. Usuários do tipo “NORMAL” só poderão remover as receitas que foram criadas por eles mesmo, enquanto usuários do tipo “ADMIN” podem remover qualquer receita do sistema. 

- `getAllRecipes` (ou por título)
Endpoint que permite um usuário logado no sistema buscar a lista de receitas pelo título. Caso não seja informado o parâmetro de busca, retorna a lista completa de receitas.

- `deleteUser`
Endpoint que permite a deleção de um usuário existente no sistema pelo seu id, permitindo que somente usuários do tipo “ADMIN” possam executar a deleção.

## Stacks utilizadas:
- nodeJS
- express
- dotenv
- cors
- knex
- TypeScript
- SQL
- uuid
- bcryptjs

## Documentação (links)

### API:
[Postman](https://documenter.getpostman.com/view/20785851/VUjLK6oN)

### Deploy:
[Heroku](https://cookenu-backend-suzy.herokuapp.com/ping)


## Programas utilizados:
- VSCode e extensão REST Client
- Beekeeper Studio
- Postman API Platform
- Heroku: Cloud Application Platform

## Autor:
**Suzy Chiconi** - desenvolvedora em treinamento pela *Labenu*.
[Github](https://github.com/future4code/aragon-Suzy-Chiconi)
[E-mail](mailto:suzy.chiconi@gmail.com)