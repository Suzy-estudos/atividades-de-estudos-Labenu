# Desafio back-end AMARO

### Descrição:
Projeto proposto pela Labenu na rodada de cases, para finalização do curso WebFullStack.
O case 'Amaro' propõe a criação de uma API com endpoints para inserção de dados e consulta dos produtos por 'id', 'name' ou 'tag'.
É requisitada também uma cobertura de teste relativamente boa.

- [case Amaro](https://github.com/amaroteam/back-end-challenge)

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

### Executando os testes:
-   `npm run test`:
    Executa todos os testes unitários criados para testar a pasta Business do projeto.

### Endpoints:
- `ping`
Endpoint de teste da API.

- `signup`
Endpoint para cadastrar novos usuários, que recebe o 'name', 'email' e 'password', e retorna uma mensagem com um token de acesso que guarda o id e a 'role' da pessoa.

- `login`
Endpoint para logar usuários já cadastrados no sistema ao receber o 'email' e o 'password' da pessoa, e que retorna junto a uma mensagem de sucesso, o token de acesso.

- `getProducts`
Endpoint público que retorna todos os produtos do banco de dados, com a possibilidade de filtrar a pesquisa por 'id' ou 'name' do produto.

- `getProductsTag`
Endpoint público que retorna todos os produtos referentes a tag solicitada.

- `postProduct`
Endpoint protegido que cadastra um novo produto no banco de dados. 

- `addTag`
Endpoint protegido que adiciona tag a um produto especificado já cadastrado no banco de dados.

## 🛠 Stacks utilizadas:
- TypeScript
- nodeJS
- express
- dotenv
- cors
- knex
- jsonwebtoken
- uuid
- bcryptjs
- mysql


## Documentação (links)

### API:
[Postman](https://documenter.getpostman.com/view/20785851/VVBXxmFX)

### Deploy:
[Heroku](https://amaro-suzy-chiconi.herokuapp.com/)


## Programas utilizados:
- VSCode e extensão REST Client
- Beekeeper Studio
- Postman API Platform
- Heroku: Cloud Application Platform

## Autora:
**Suzy Chiconi** - desenvolvedora em treinamento pela *Labenu*.
[Github](https://github.com/future4code/aragon-Suzy-Chiconi)
[E-mail](mailto:suzy.chiconi@gmail.com)