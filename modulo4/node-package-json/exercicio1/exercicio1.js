/*
### Exercício 1
a) Responda como comentário no seu código: 
Como fazemos para acessar os parâmetros passados na linha de comando para o Node?

RESPOSTA:
Acessamos através de process.argv, informando a posição deles no índice do array, 
contando que o índice 0 é o proprio node, e o índice 1 é o "nome-do-arquivo.js"
*/


/*
b) Crie um programa que receba seu nome e sua idade. Após receber estes valores, 
imprima no console uma mensagem que siga a seguinte estrutura:
    Resposta esperada → 
    ”Olá, (Nome)! Você tem (sua idade) anos!”

c) Altere o programa acima para que mostre também a sua idade daqui a sete anos.
    Resposta esperada → 
    “Olá, (Nome)! Você tem (sua idade) anos. Em sete anos você terá (nova idade)”
- Dica: Os parâmetros do node sempre chegam como strings. 
Pense em uma maneira de transformar estes valores em um tipo number.
*/
const usuario = process.argv[2]
const idade = Number(process.argv[3])
const idadeFutura = idade + 7

console.log(`Olá, ${usuario}! Você tem ${idade} anos! Em sete anos você terá ${idadeFutura}.`)