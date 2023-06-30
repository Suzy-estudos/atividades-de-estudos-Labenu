/*
## Exercício 3
### Letra A
Após algumas verificações, a equipe de desenvolvimento chegou a conclusão 
de que não seria mais necessário armazenar os títulos de cada projeto, já que 
o nome deles já são significativos o suficiente. 
Partindo desta situação, desenvolva uma query que possibilite a remoção dos dados de 
title (e também a coluna inteira), sem apagar a tabela inteira. 
Confirme o sucesso da operação.

Dica 1: Utilize os comandos ALTER TABLE com DROP COLUMN.
Dica 2: Para confirmação de mudanças na estrutura da tabela, utilize o comando DESCRIBE.
*/
SELECT * FROM `Projetos`;

ALTER TABLE `Projetos`
DROP COLUMN title;

DESCRIBE `Projetos`;

/*
### Letra B
Outra modificação constatada pela equipe reside em alterar o nome da propriedade 
que armazena os prazos de vencimento dos projetos, visto que “date” é um nome muito amplo 
(pode significar o início do projeto, data de previsão, entre períodos de entregas, etc). 
Disto isto, desenvolva uma query que altere o nome da propriedade “date” para “dueDate”, 
sem apagar a tabela inteira. 
Confirme o sucesso da operação.

Dica 1: Utilize os comandos ALTER TABLE com CHANGE.
Dica 2: Para confirmação de mudanças na estrutura da tabela, utilize o comando DESCRIBE.
*/
ALTER TABLE `Projetos`
CHANGE date dueDate DATE NOT NULL;

DESCRIBE `Projetos`;

/*### Letra C
Ainda pensando nas alterações de dados do sistema da empresa, a equipe percebeu que 
os e-mails de usuários (criados no dia anterior) podem ser registrados mais de uma vez, 
quando na verdade queremos que cada usuário só tenha um único e-mail. 
Desta forma, desenvolva uma query que adicione a restrição de e-mail único para cada 
usuário na tabela de usuários, sem apagar a tabela inteira. 
Confirme o sucesso da operação.

Dica 1: Utilize os comandos ALTER TABLE e MODIFY.
Dica 2: Para confirmação de mudanças na estrutura da tabela, utilize o comando DESCRIBE.
*/
ALTER TABLE `Funcionarios`
MODIFY email VARCHAR(255) UNIQUE NOT NULL;

DESCRIBE `Funcionarios`