# Introdução a Autenticação

### Descrição:
Estudos em POO - Programação Orientada a Objetos, introduzindo autenticação em um sistema de login.

### Instalando as dependências:
-   `npm install`:
    Instala todas as dependências listadas no `package.json`.

### Criando o arquivo .env:
Criar o arquivo `.env` e configurar com as informações de seu banco de dados.
```
PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
```

### Criando e Populando a tabela:
-   `npm run migrations`
    Cria e Popula a tabela, em conexão com o banco de dados.

### Executando o projeto:
-   `npm run dev`:
    Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.

## Funcionalidades

### Endpoints:
- `ping`
Endpoint de teste.

- `signup`
Endpoint para cadastrar novos usuários.

- `login`
Endpoint para logar usuários já cadastrados no sistema.

- `getAllUsers` (or by nickname)
Endpoint que realiza a busca completa de todos os usuários cadastrados (ou por nickname).

- `editUser`
Endpoint que edita os dados do próprio usuário.

- `deleteUser`
Endpoint que deleta via id a conta de um usuário cadastrado.

## Stacks utilizadas:
- nodeJS
- express
- dotenv
- cors
- knex
- TypeScript
- SQL
-  uuid

## Programas utilizados (Ferramentas):
- VSCode e extensão REST Client
- Beekeeper Studio

## Autor:
**Suzy Chiconi** - desenvolvedora em treinamento pela *Labenu*.
[github](https://github.com/future4code/aragon-Suzy-Chiconi)