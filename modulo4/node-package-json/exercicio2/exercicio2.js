/*
### Exercício 2
Crie uma aplicação Node que recebe uma string representando uma operação matemática 
e dois valores numéricos. O retorno deverá ser o resultado da operação selecionada 
utilizando os 2 valores fornecidos.

- Exemplo 1:    
    Comando → npm run start add 2 2
    Resposta esperada → 4
    
- Exemplo 2:    
    Comando → npm run start sub 10 2
    Resposta esperada → 8
    
- Exemplo 3:    
    Comando → npm run start mult 50 2
    Resposta esperada → 100
    
- Exemplo 4:    
    Comando → npm run start div 100 2
    Resposta esperada → 50
    
Dicas: 
- Dica 1: Lembre-se da ordem de recebimento de argumentos do node. Para acessar os 
argumentos, usamos o objeto process.argv, que é um array de todos os parâmetros usados 
pelo Node. Os argumentos [0] e [1] são fixos, onde o primeiro é o próprio Node e o 
segundo é o arquivo que está rodando. Todos os valores são armazenados como string.
- Dica 2: Pense em uma maneira de separar a sua lógica condicionalmente para cada tipo 
de operação passada como parâmetro para o Node.
*/
const operacaoMatematica = process.argv[2]

const num1 = Number(process.argv[3])
const num2 = Number(process.argv[4])

const calculadora = () => {
    switch (operacaoMatematica) {
        case "add":
            return num1 + num2

        case "sub":
            return num1 - num2
        
        case "mult":
            return num1 * num2

        case "div":
            return num1 / num2

        default:
            return "Parâmetro incorreto! Tente novamente."
    }
}

console.log(calculadora())