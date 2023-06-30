/*
## Exercício 3
Analise a função a seguir escrita em JS, e responda as perguntas:


function obterEstatisticas(numeros) {

    const numerosOrdenados = numeros.sort(
        (a, b) => a - b
    )

    let soma = 0

    for (let num of numeros) {
        soma += num
    }

    const estatisticas = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }

    return estatisticas
}

### Parte 1
Quais são as entradas e saídas dessa função? 
RESPOSTA: 
ENTRADA: UM ARRAY DE NÚMEROS 
SAÍDA: UM OBJETO COM O MAIOR, O MENOR E A MÉDIA DOS NÚMEROS DO ARRAY

Copie a função para um arquivo typescript e faça a tipagem desses parâmetros. 
Utilize o type para tipar a saída da função.
- Dica: Lembre-se da variável de tipo do typescript, 
  que é uma descrição estrutural do comportamento de um objeto. 
  Ou seja, o type define as propriedades e tipos que o objeto deve ter. 


### Parte 2
Quais outras variáveis compõem a implementação dessa função? Tipe todas elas.
- Dica: Procure por todas as declarações, normalmente tipamos as variáveis criadas!
RESPOSTA:
const numerosOrdenados:number[]
let soma:number
const estatisticas:Estatisticas
*/
type Estatisticas ={
    maior:number,
    menor:number,
    media:number
}

function obterEstatisticas(numeros:number[]):Estatisticas {

    const numerosOrdenados:number[] = numeros.sort(
        (a, b) => a - b
    )

    let soma:number = 0

    for (let num of numeros) {
        soma += num
    }

    const estatisticas:Estatisticas = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }

    return estatisticas
}

console.log(obterEstatisticas([7, 8, 4, 9, 13, 21]))