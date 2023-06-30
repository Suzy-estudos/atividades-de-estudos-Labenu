/*
## Exercício 5
### Letra A
Desenvolva uma query que exiba todos as informações dos projetos registrados, 
em ordem decrescente de prazo de vencimento, ou seja, o primeiro item deve ser o que 
possui o prazo mais distante e o último item possui o prazo mais próximo da data atual.

Dica: Utilize os comandos SELECT e ORDER BY.
*/
SELECT *
FROM `Projetos`
ORDER BY dueDate DESC;

/*
### Letra B
Desenvolva uma query que exiba o nome e prazo de vencimento dos projetos próximos de 
sua data final de entrega. Mostre apenas os 2 mais próximos de encerrarem.

Dica: Utilize os comandos SELECT, ORDER BY e LIMIT.
*/
SELECT name, dueDate
FROM `Projetos`
ORDER BY dueDate ASC
LIMIT 2;