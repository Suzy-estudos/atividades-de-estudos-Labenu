/*
## Exercício 3
Neste exercício, trabalharemos com a manipulação na exibição de dados.

### Letra A
Desenvolva uma query que exiba a lista completa de usuários criados anteriormente, 
com todos os seus dados.

Dica 1. Utilize o comando SELECT.
Dica 2: Para selecionar todos os dados de uma tabela, utilizamos o caractere “*”.
*/
SELECT * FROM `Funcionarios`;

/*
### Letra B
Desenvolva uma query que nos retorne apenas as informações de id e nome dos usuários 
da tabela. Além disso, a coluna de id´s deve ser exibida com o texto “identifier”.

Dica 1: Utilize o comando SELECT.
Dica 2: Para modificação de nome na exibição, utilizamos o comando AS.
*/
SELECT id AS identifier, nome FROM `Funcionarios`;

/*
### Letra C
Desenvolva uma query que nos retorne apenas as informações do usuário “Laura”. 
A busca deve ser feita pelo id.

Dica 1: Utilize o comando SELECT.
Dica 2: Utilize o comando WHERE para restringir a sua busca.
*/
SELECT * FROM `Funcionarios`
WHERE id = "003";

/*
### Letra D
Desenvolva uma query que nos retorne todos os usuários que tenham a letra “a” no seu nome.

Dica 1: Utilize o comando SELECT.
Dica 2: Utilize a combinação dos comando WHERE e LIKE para a busca.
*/
SELECT * FROM `Funcionarios`
WHERE nome LIKE "%a%";

/*
### Letra E
Desenvolva uma query que nos retorne todos os usuários que não tenham a letra “r” no seu 
nome, mas que tenham a letra “u” no seu e-mail.

Dica 1: Utilize o comando SELECT.
Dica 2: Utilize a combinação dos comandos WHERE, LIKE e NOT para a busca.
*/
SELECT * FROM `Funcionarios`
WHERE nome NOT LIKE "%r%" AND email LIKE "%u%";