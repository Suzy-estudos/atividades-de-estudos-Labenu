# <img src="https://user-images.githubusercontent.com/89756948/184552819-0d6c84fc-8e25-4cd0-ad94-05dcd5d477df.png" width=30x30/> Projeto Labbok

### Descrição:
O Labook é uma rede social com o objetivo de promover a conexão e interação entre seus mais diversos usuários. 
As pessoas poderão criar e curtir publicações.

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

JWT_KEY = senha
JWT_EXPIRES_IN = duração do token
BCRYPT_SALT_ROUNDS = 12
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
Endpoint para cadastrar novos usuários, que recebe o 'name', 'email' e 'password', e retorna uma mensagem com um token de acesso que guarda o id e a 'role' da pessoa.

- `login`
Endpoint para logar usuários já cadastrados no sistema ao receber o 'email' e o 'password' da pessoa, e que retorna junto a uma mensagem de sucesso, o token de acesso.

- `createPost`
Endpoint protegido que cria um post.

- `getAllPosts`
Endpoint protegido que retorna todos os posts.

- `deletePost`
Endpoint protegido que deleta um post. Admins podem deletar qualquer post, enquanto contas normais só podem deletar seus próprios posts.

- `likePost`
Endpoint protegido que dá like em um post. Uma mesma pessoa não pode dar mais de um like a um post.

- `deslikePost`
Endpoint protegido que remove o like de um post.

## Stacks utilizadas:
- nodeJS
- express
- dotenv
- cors
- knex
- TypeScript
- jsonwebtoken
- uuid
- bcryptjs
- SQL

## Documentação (links)

### API:
[Postman](https://documenter.getpostman.com/view/20785851/VUjSGjLT)

### Deploy:
[Heroku](https://labook-suzy-chiconi.herokuapp.com/)


## Programas utilizados:
- VSCode e extensão REST Client
- Beekeeper Studio
- Postman API Platform
- Heroku: Cloud Application Platform

## Autor:
**Suzy Chiconi** - desenvolvedora em treinamento pela *Labenu*.
[Github](https://github.com/future4code/aragon-Suzy-Chiconi)
[E-mail](mailto:suzy.chiconi@gmail.com)