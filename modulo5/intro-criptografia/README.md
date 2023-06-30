# Criptografia, encriptação, hash e user roles

### Descrição:
Estudos em POO - Programação Orientada a Objetos, introduzindo criptografia e roles em um sistema de login.
Nossos usuários do sistema agora deverão possuir uma nova propriedade chamada “role”, que poderá valer “NORMAL” ou “ADMIN”, sendo “NORMAL” como padrão.

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
Endpoint para cadastrar novos usuários, onde sua senha seja armazenada de forma mais segura no formato hash. O token também deve possuir a propriedade “role”.

- `login`
Endpoint para logar usuários já cadastrados no sistema, com a verificação de usuário válido sendo feita pelo algoritmo de hash (comparação entre senha em plaintext e hash armazenado no banco de dados). O token também deve possuir a propriedade “role”.

- `getAllUsers` (or by nickname)
Endpoint que realiza a busca completa de todos os usuários cadastrados (ou por nickname).

- `editUser`
Endpoint de edição de dados de usuário que permite alterar um usuário pelo seu id. A alteração de dados dependerá do tipo de usuário do sistema. Se o usuário logado for do tipo “NORMAL”, este só poderá modificar os seus próprios dados. Caso seja um “ADMIN”, será permitido a modificação de qualquer usuário do sistema.

- `deleteUser`
Endpoint que deleta via id a conta de um usuário cadastrado, permitindo que somente usuários do tipo “ADMIN” possam executar a deleção.

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

## Programas utilizados (Ferramentas):
- VSCode e extensão REST Client
- Beekeeper Studio

## Autor:
**Suzy Chiconi** - desenvolvedora em treinamento pela *Labenu*.
[github](https://github.com/future4code/aragon-Suzy-Chiconi)