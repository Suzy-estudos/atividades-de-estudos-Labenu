/*
## Exercício 1
Desenvolva uma query que crie uma tabela de usuários (funcionários) de uma dada empresa. 
Um usuário será representado no banco pelas seguintes propriedades:
    - id: Identificador único do usuário no banco de dados, representado por um número 
      em formato string (exemplo: “456”, “009”, “1253”).
    - name: Nome do usuário, em formato string.
    - email: E-mail do usuário, em formato string.

Dica 1: Utilize o comando CREATE TABLE.
Dica 2: Dê um nome significativo para a sua tabela no banco.
Dica 3: Por uma questão de padronização, nomes de tabelas começarão por letra maiúscula. 
        Para nomes compostos, a primeira letra de cada nome também será maiúscula. 
        Utilize “_” para separar os nomes (exemplo: Foods_List)
*/
CREATE TABLE `Funcionarios` (
	id VARCHAR(255) KEY,
  	nome VARCHAR(255) NOT NULL,
  	email VARCHAR(255) NOT NULL UNIQUE
);