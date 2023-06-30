/*
### Exercício 3
Crie uma aplicação Node que receba uma string representando uma tarefa. 
O programa deve adicionar esta nova tarefa em uma variável que represente uma lista 
de tarefas. 
A lista de tarefas pode ser criada antes da execução do código. 
Após adicionar o item à lista, exiba a lista atualizada.

Exemplo:
Comando → npm start "Comprar Leite"
Resposta esperada → 
"Tarefa adicionada com sucesso!", "tarefas: ["Lavar a louça","Comprar Leite"]"

Observação: A lista de tarefas só estará atualizada durante a execução do código. 
Ao rodar novamente, a lista começará novamente a partir de seu estado inicial.
*/
const tarefas = ["Lavar a louça"]

const adicionaTarefa = () => {
    tarefas.push(process.argv[2])
    return `Tarefa adicionada com sucesso! "tarefas: ${tarefas}"`
}

console.log(adicionaTarefa())