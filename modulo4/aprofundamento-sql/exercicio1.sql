/*
## Exercício 1
Desenvolva uma query que crie uma tabela de projetos para a empresa. 
Um projeto será inicialmente representado no banco de dados pelas seguintes 
propriedades e CONSTRAINTS:
    - id: Identificador do projeto, representado por um número em formato string. 
          Deve ser uma chave primária.
    - name: Nome do projeto, em formato string. 
            Deve ser um valor único para cada projeto e não pode ser nulo.
    - title: Título do projeto, em formato string. Não pode ser um valor nulo.
    - date: Data de vencimento do projeto. Não pode ser um valor nulo.

Dica: No SQL datas devem ser cadastradas como variáveis de tipo DATE.
*/
CREATE TABLE `Projetos` (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL
);