# Projeto LabenuSystem

### Descrição:
Um sistema que representa o básico de uma organização educacional, e permite o registro, acesso e manipulação de participantes ativos de um ambiente educacional (estudantes e turmas).

## Instruções

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

### Criando e Populando as tabelas:
-   `npm run migrations`
    Cria e Popula as tabelas, em conexão com o banco de dados.

### Executando o projeto:
-   `npm run dev`:
    Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.

## Funcionalidades

### Endpoints:
- `ping`
Endpoint de teste.

- `getAllClassrooms`
Endpoint que busca por todas as turmas cadastradas no sistema.

- `createClassroom`
Endpoint que cria uma nova turma no sistema.

- `getActiveClass`
Endpoint que busca todas as turmas ativas (turmas inativas estão no módulo 0).

- `changeModuleClassroom`
Endpoint que edita o módulo de uma turma do sistema.

- `getAllStudents`
Endpoint que busca por todos os estudantes cadastrados no sistema.

- `createStudent`
Endpoint que cria o registro de um novo estudante no sistema.

- `getStudentByName`
Endpoint que busca um estudante pelo nome (Caso o filtro não seja enviado, retorna a lista completa de estudantes).

- `editStudentClass`
Endpoint que edita a turma em que o estudante está matriculado.

- `getStudentsClass`
Endpoint que exibe todas as pessoas pertencentes a uma turma, exibindo nessa lista apenas a 'id', 'name' e 'email' de cada participante.

## Documentação (links)

### API:
[Postman](https://documenter.getpostman.com/view/20785851/Uze1uiwt)

### Deploy:
[Heroku](https://labenu-system-suzy.herokuapp.com/classrooms)


## Stacks utilizadas:
- nodeJS
- express
- dotenv
- cors
- knex
- TypeScript
- SQL


## Programas utilizados:
- VSCode e extensão REST Client
- Postman API Platform
- Heroku: Cloud Application Platform

## Autor:
**Suzy Chiconi** - desenvolvedora em treinamento pela *Labenu*.
[github](https://github.com/future4code/aragon-Suzy-Chiconi)